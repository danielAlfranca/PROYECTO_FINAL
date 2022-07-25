<?php 


class Section{   
    
    protected $connection; // BASE DE DATOS;

    public static $fixed_constants = [];// para valores fijos

    public static $indexes = []; // PATHS DE LAS PROPIEDADES;
 
    public function __construct(){

        $this->connection = Database::connect();

        $this->init_validations();        
    } 

    public static function get_property($data, $name){ // SI NO ES UNA PROP CON VALOR FIJO SE DEVUELE EL VALOR OBTENIDOA TRAVES DE LA RUTA

        return isset(static::$fixed_constants[$name]) ? static::$fixed_constants[$name]:static::get_prop_by_path($data,$name);
    }

    public static function set_property($data, $value, $name){ // SI NO ES UNA PROP CON VALOR FIJO SE DEVUELE EL VALOR OBTENIDOA TRAVES DE LA RUTA
        
        $newValue = isset(static::$fixed_constants[$name])  ? static::$fixed_constants[$name]:$value;

        return static::set_prop_by_path($data,$name,$newValue);
    }

    protected static function get_prop_by_path($data, $name){  // LOS OBJETOS SON ARRAYS ANIDADOS. EN INDEXES SE DEFINEN LOS PATH Y AQUI SE OBTIENEN LOS VALORES A TRAVES DE ESOS PATHS

        $indexes  = static::$indexes[$name]['private'];
        $arr = array_map(fn($e)=>intval($e), explode(".", $indexes ));

        return array_reduce($arr, fn($carry, $prop)=>$carry[$prop],$data);
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

    public function save($data){}

    public function update($data){}

    public function select($data){}

    public function delete($data){}
    
    public function validate($data){

        $keys = static::$indexes;
        $obj_is_valid = true;

        foreach ($keys as $name => $field) {
            
            $validations = $field['validations'];

            foreach ($validations as $validation) {

               if(!($this->validations[$validation]($data,$name)) ){ $obj_is_valid = false;}
            }
        }

        return $obj_is_valid;
    }

    public function sanitize($data){}

    public $validations = []; // lista de validaciones para datos

    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad asi que hay que hacerlo por este metodo

        $this->validations['is_string'] = fn($data, $name)=>is_string(static::get_property($data,$name)); 

        $this->validations['is_boolean'] = fn($data, $name)=> static::get_property($data,$name);// FALTA; 

        $this->validations['agent_valid'] = fn($data, $name)=>$this->select(static::get_property($data,$name));
        
        $this->validations['is_string_array'] = function ($data, $name){

            $arr = static::get_property($data,$name);

            if(!is_array($arr))return false;

            foreach ($arr as $value) { if(!is_string($value)) return false;}

            return true;
        }; 
        $this->validations['id_valid'] = function ($data, $name){

            $id = static::get_property($data,'id');
            $exists = $this->select($id);

            return $id=='nuevo' || $exists;
        };        
    }
    

}