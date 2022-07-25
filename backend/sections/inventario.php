

<?php 


class Inventario {

    protected $connection; // BASE DE DATOS;

    public static $type; // 1 PARA EMPRESA, 2 PARA TRABAJADOR ...;

    public static $defaultAgent ;// SOLO EN EMPRESA NO HAY DEFAULT;

    public static $indexes = []; // PATHS DE LAS PROPIEDADES;
 
    public function __construct(){

        $this->connection = Database::connect();       
    }

    public static function get_property($data, $name){

        switch ($name) {

            case 'agent': return self::$defaultAgent ? self::$defaultAgent : self::get_prop_by_path($data,$name);// SI TIENE AGENTE POR DEFECTO EL VALOR SIEMPRE HA DE SER ESE
            case 'type': return self::$type;// SE FUERZA A QUE EL OBJETO SIEMPRE SEA DEL TIPO ASOCIADO A  LA CLASE
            default: return self::get_prop_by_path($data,$name);              
        }

    }

    public static function set_property($data, $value, $name){

        switch ($name) {

            case 'agent':{ 
                
                $agent = self::$defaultAgent ? self::defaultAgent  : $value; // SI TIENE AGENTE POR DEFECTO EL VALOR SIEMPRE HA DE SER ESE
                return self::set_prop_by_path($data,$name,$agent );
            }
            case 'type':return self::set_prop_by_path($data,$name,self::type);  // SE FUERZA A QUE EL OBJETO SIEMPRE SEA DEL TIPO ASOCIADO A  LA CLASE

            default:  return self::set_prop_by_path($data,$name,$value);          
        }

    }

    protected static function get_prop_by_path($data, $name){  // LOS OBJETOS SON ARRAYS ANIDADOS. EN INDEXES SE DEFINEN LOS PATH Y AQUI SE OBTIENEN LOS VALORES A TRAVES DE ESOS PATHS

        $indexes  = self::$indexes[$name];
        $arr = array_map(fn($e)=>intval($e), explode(".", $indexes ));

        return array_reduce($arr, fn($carry, $prop)=>$carry[$prop],$data);
    }

    protected static function set_prop_by_path($data, $name, $value) { 
        
        // LOS OBJETOS SON ARRAYS ANIDADOS. EN INDEXES SE DEFINEN LOS PATH Y AQUI SE ESTABLECEN  LOS VALORES A TRAVES DE ESOS PATHS

        $indexes = self::$indexes[$name];
        $path = array_map(fn($e)=>intval($e), explode(".", $indexes));
        $len = count($path);
 
        $temp = &$data; // CARACTER & ES NECESARIO PARA INDICAR QUE ES UNA REFERENCIA Y NO SOLO UNA VARIABLE TEMPORAL

        foreach($path as $key) {
            $temp = &$temp[$key];
        }
        $temp = $value;
        unset($temp);
        
        return $data ;
    }

    protected function newAgent(){

        $type = self::$type;
        $query = $this->connection->prepare("INSERT INTO agents (agent_type) VALUES($type)");
        $query->execute();

        return $this->connection->lastInsertId();
    }

    public function update($data){

        $query = $this->connection->prepare("UPDATE inventory_items SET agent=:agent, type=:item_type, data=:data WHERE id=:id");

        $id = self::get_property($data,'id');
        $agent = self::get_property($data,'agent');
        $type = self::get_property($data,'type');
        $datajson = json_encode(self::get_property($data,'data'));
        // $hidden = json_encode($this->get_property($data,'hidden'));  !!! No se actualiza . Solo se hace por delete llegado el caso
  
        $query->bindValue(':agent', $agent);
        $query->bindValue(':item_type', $type);
        $query->bindValue(':data', $datajson);
        $query->bindValue(':id', $id);
     
        if($query->execute()){

            $item = $this->select(self::get_property($data,'id'));

            $datajson = json_decode(self::get_property($item,'data'));

            $item = self::set_property($item, $datajson,'data');           

            return $item;
        }

        return false;
    }

    public function select($id){

        $query = $this->connection->prepare("SELECT * FROM inventory_items WHERE id=:id");

        $query->setFetchMode(PDO::FETCH_NUM);

        $query->bindValue(':id', $id);
        
        $query->execute();

        return $query->fetch();
    }


    public function save($data){

        $id = self::get_property($data,'id');
       
        if($id!='nuevo') return $this->update($data);

        try{

            $this->connection->beginTransaction();

            $agent = $this->newAgent();   
            $type = self::get_property($data,'type');
            $datajson = json_encode(self::get_property($data,'data'));
            $hidden = false; 
    
            $query = $this->connection->prepare("INSERT INTO inventory_items (agent, type, data, hidden) VALUES(:agent, :type, :data, :hidden)");

            $query->bindValue(':agent', $agent);
            $query->bindValue(':type', $type);
            $query->bindValue(':data', $datajson);
            $query->bindValue(':hidden', $hidden);

            if($query->execute()){

                $lastID = $this->connection->lastInsertId();
    
                $item  = $this->select( $lastID );

                $datajson = json_decode(self::get_property($item,'data'));

                $item = self::set_property($item, $datajson,'data');   

                $this->connection->commit();
        
                return $item;

            }else return false;

        }catch(PDOExecption $e) { return false; }
       
    }



    public function delete($data){

        $query = $this->connection->prepare("UPDATE inventory_items SET hidden=TRUE  , WHERE id=:id");
        $query->bindValue(':id', self::get_property($data,'id'));

        return $query->execute();
    }
    
    public function validate($data){ }

    public function sanitize($data){}

   

   
}