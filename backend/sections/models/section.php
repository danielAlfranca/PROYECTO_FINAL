<?php 


class Section{   
    
    protected $connection; // BASE DE DATOS;

    public static $indexes = []; // PATHS DE LAS PROPIEDADES;

    public $validations = []; // lista de validaciones para datos

    public static $table; // tabla para insertar datos

    public $sanitize_funcs = []; // lista de sanitizaciones para datos desde cliente

    private $userID;
 
    public function __construct(){

        $this->connection = Database::connect();

        $this->userID = $this->getUserId();

        $this->init_sanitize_funcs(); 

        $this->init_validations();        
    } 

    public static function get_property($data, $name){ // SI NO ES UNA PROP CON VALOR FIJO SE DEVUELE EL VALOR OBTENIDOA TRAVES DE LA RUTA

        return static::get_prop_by_path($data,$name);
    }

    public static function set_property($data, $value, $name){ // SI NO ES UNA PROP CON VALOR FIJO SE DEVUELE EL VALOR OBTENIDOA TRAVES DE LA RUTA
        
        return static::set_prop_by_path($data,$name,$value);
    }

    protected static function get_prop_by_path($data, $name){  // LOS OBJETOS SON ARRAYS ANIDADOS. EN INDEXES SE DEFINEN LOS PATH Y AQUI SE OBTIENEN LOS VALORES A TRAVES DE ESOS PATHS

        $indexes  = static::$indexes[$name]['private'];
        $arr = array_map(fn($e)=>intval($e), explode(".", $indexes ));

        return array_reduce($arr, function($carry, $prop){
            
            if($carry && isset($carry[$prop])) return $carry[$prop];

            return false;
        
        },$data);
    }

    protected static function set_prop_by_path($data, $name, $value) { 
        
        // LOS OBJETOS SON ARRAYS ANIDADOS. EN INDEXES SE DEFINEN LOS PATH Y AQUI SE ESTABLECEN  LOS VALORES A TRAVES DE ESOS PATHS

        $indexes = static::$indexes[$name]['private'];
        $path = array_map(fn($e)=>intval($e), explode(".", $indexes));

     
        $temp = &$data; // CARACTER & ES NECESARIO PARA INDICAR QUE ES UNA REFERENCIA Y NO SOLO UNA VARIABLE TEMPORAL

        foreach($path as $key) {
            $temp = &$temp[$key];
        }
        $temp = $value;
        unset($temp);

        
        return $data ;
    }

    public function save($command){       
       
        $data = $command['item'];

        $id = static::get_property($data,'id');
       
        if($id!='nuevo') return $this->update($command);

        try{

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare($this->getQueryString('save'));
            $keys = static::$indexes;            

            foreach (array_keys($keys) as $keyName) {
               
                if($keyName!='id'){ $query->bindValue(":$keyName", $data[$keys[$keyName]['private']] );  }
            }

            if($query->execute()){

                $lastID = $this->connection->lastInsertId();

                $item  = $this->select( $lastID );

                $extra_data = [];

                if(array_key_exists('extra_data',$command)){
                    
                   $extra_data = $this->save_extra_data($item, $command['extra_data']);               
                }            

                $this->connection->commit();
                
                return ['item'=>$item, 'extra_data'=>$extra_data];
                

            }else return false;

        }catch(PDOException $e) { return false; }
    }

    public function update($command){

        $data = $command['item'];

        $id = static::get_property($data,'id');
       
        if($id=='nuevo') return $this->save($command);

        try{

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare($this->getQueryString('update'));
            $keys = static::$indexes;        

            foreach (array_keys($keys) as $keyName) {

               $query->bindValue(":$keyName", $data[$keys[$keyName]['private']] );       
            }

            if($query->execute()){

                $this->connection->commit();

                $item = $this->select(static::get_property($data,'id'));
                $extra_data = [];

                if(array_key_exists('extra_data',$command)){                    

                    $extra_data = $this->save_extra_data($item, $command['extra_data']);               
                 }               
                
                return ['item'=>$item, 'extra_data'=>$extra_data];

            }else return false;

        }catch(PDOExecption $e) { return false; }
        
    }
    
    
   
    public function select($id){

        try{            

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare($this->getQueryString('select'));            

            $query->setFetchMode(PDO::FETCH_NUM);

            $query->bindValue(':id', $id);
            
            if($query->execute()){

                return $query->fetch();

            }else return false;

        }catch(PDOExecption $e) { return false; }
    
    }

    public function delete($command){

        $data = $command['item'];

        try{

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare($this->getQueryString('delete'));

            $query->bindValue(':id', static::get_property($data,'id')); 

            if($query->execute()){

                return $data;

            }else return false;

        }catch(PDOExecption $e) { return false; }

    }

    public function dataSet($field, $value, $dates = false){
  
        $table = static::$table; 

        $queryString = "SELECT * FROM $table WHERE $field=:$field";         

        $query = $this->connection->prepare($queryString);
        $query->setFetchMode(PDO::FETCH_NUM);
        $query->bindValue(":$field", $value);

        if($query->execute()) return $query->fetchAll();        

        return false;
    }

    protected function save_extra_data($item, $extra_data){

        return [];
    }

    
    public function validate($data){ // validada datos segun las validaciones especificadas en keys

        $keys = static::$indexes;
        $obj_is_valid = true;
        $errors =[];

        foreach ($keys as $name => $field) {
            
            $validations = $field['validations'];
            $value = self::get_property($data, $name);

            foreach ($validations as $validation) {
                
               if( ($field['required'] && empty($value) && $value !==false && $value !==0) || 
               (!empty($value) && !$this->validations[$validation]($data,$name))){ 
                
                    $obj_is_valid = false;
                    $errors[$name] = $value ;            
                }
            }
        }

        return $errors;
    }

    public function sanitize($data){ // sanitiza datos segun las validaciones especificadas en keys

        $keys = static::$indexes;
        $sanitized = $data;

        foreach ($keys as $name => $field) {
            
            $validations = $field['validations'];

            foreach ($validations as $validation) {            
               
               $value = $this->sanitize_funcs[$validation]($sanitized,$name);
               $sanitized = self::set_property($sanitized,$value,$name);              
            }
        }

        return $this->sanitizeUser($sanitized);
    }



    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad asi que hay que hacerlo por este metodo

        $this->validations['is_string'] = fn($data, $name)=>is_string(static::get_property($data,$name)); 

        $this->validations['is_number'] = fn($data, $name)=>is_numeric(static::get_property($data,$name)); 

        $this->validations['is_boolean'] =  function($data, $name) {
            
            $value = intval(static::get_property($data,$name));

            return $value == 1 || $value == 0;
        
        };

        $this->validations['agent_valid'] = fn($data, $name)=>$this->select(static::get_property($data,$name));
        
        $this->validations['is_string_array'] = function ($data, $name){

            $arr = static::get_property($data,$name);

            if(!is_array($arr))return false;

            foreach ($arr as $value) { if(!is_string($value)) return false;}

            return true;
        }; 
        $this->validations['id_valid'] = function ($data, $name){

            $id = static::get_property($data,'id');

            return $id=='nuevo' || boolval($this->select($id));
        };        
    }

    protected function init_sanitize_funcs(){ // php no permite asignarlo directamente en la propiedad asi que hay que hacerlo por este metodo

        $this->sanitize_funcs['is_string'] = fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_SANITIZE_STRING); 

        $this->sanitize_funcs['is_boolean'] =  fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);

        $this->sanitize_funcs['is_number'] =  fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);

        $this->sanitize_funcs['agent_valid'] = fn($data, $name)=>filter_var(strval(self::get_property($data,$name)),FILTER_SANITIZE_STRING);

        $this->sanitize_funcs['id_valid'] = fn($data, $name)=>filter_var(strval(self::get_property($data,$name)),FILTER_SANITIZE_STRING);

        $this->sanitize_funcs['type_valid'] = fn($data, $name)=>filter_var(strval(self::get_property($data,$name)),FILTER_SANITIZE_STRING);
        
        $this->sanitize_funcs['is_string_array'] = function ($data, $name){

            $value = self::get_property($data,$name);
            $value = $value ? $value : [];
            return array_map(fn($item)=>filter_var(strval($item),FILTER_SANITIZE_STRING), $value);
        }; 
            
    }

    protected function getQueryString($action){

        $table = static::$table;
        $keys = array_keys(static::$indexes);
        $keysWithoutId = array_filter($keys,fn($e)=>$e!='id');  

        switch ($action) {
            

            case 'save': {
                
                $columns = '('.implode(", ", $keysWithoutId).")";
                $columnsValues = '('.implode(", ", array_map(fn($e)=>':'.$e,$keysWithoutId)).")";

                return "INSERT INTO $table $columns VALUES $columnsValues";        
            }

            case 'update': {
                
                $setValues = implode(", ",array_map(fn($e)=>$e."=:".$e, $keysWithoutId));

                return "UPDATE $table SET ".$setValues." WHERE id=:id";            
            }

            case 'delete': {
                
                return "DELETE FROM $table WHERE id=:id";            
            }

            case 'select': {
                
                return "SELECT * FROM $table WHERE id=:id";                 
            }           

        }

    } 

   
    private function getUserId(){

        return 1;
    }

    private function hasUserColumn(){

        return array_key_exists('user', static::$indexes);
    }

}