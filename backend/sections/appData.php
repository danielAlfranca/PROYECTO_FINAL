<?php 

require '../shared/database.php';

class AppData{   
    
    private $connection;

    public function __construct(){

        $this->connection = Database::connect();
    }
    
    public function dataSet($data){

        $query = $this->connection->prepare("SELECT * FROM inventory_items");
        $query->setFetchMode(PDO::FETCH_NUM);
        $query->execute();

        $inventario = $this->prepare_sections_inventario($query->fetchAll());
       
        return $inventario;
    }

    public function prepare_sections_inventario($inventario){

        $empresas = [];
        $trabajadores = [];
        $tours = [];
        $hoteles = [];
        $paquetes = [];

        foreach ($inventario as $key => $value) {
            
            $value[3] = json_decode($value[3]);
            $type = $value[2];

            switch ($type) { 

                case 1: $empresas[$value[0]] = $value; break;  // se pone una la id en posicion 0 del array como porpiedad del objeto inventario
                case 2: $trabajadores[$value[0]] = $value; break;
                case 3: $hoteles[$value[0]] = $value; break;
                case 4: $tours[$value[0]] = $value; break;
                case 5: $paquetes[$value[0]] = $value; break;
            }
            
        }

        return ["empresa"=>$empresas, "trabajador"=>$trabajadores, "hotel"=>$hoteles, "tour"=>$tours, "paquete"=>$paquetes];
    } 
    
    public function validate($data){
        
        if(!$data)  return true;    
    }

    public function sanitize($data){

        if(!$data)  return $data;
    }

}