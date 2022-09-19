<?php 



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

        $query = $this->connection->prepare("SELECT * FROM activity_group");
        $query->setFetchMode(PDO::FETCH_NUM);
        $query->execute();

        $activity_groups = $query->fetchAll();

        $filteredReservas = array_filter($activity_groups, fn($e)=>$e[1]==1);
        $filteredSalidas = array_filter($activity_groups, fn($e)=>$e[1]==2);

        $reservas = ["reserva"=>$this->prepare_reservas($filteredReservas)];
        $salidas = ["salida"=>$this->prepare_salidas($filteredSalidas)];
       
        return array_merge($inventario, $reservas, $salidas);
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

    public function prepare_reservas($reservas){

        $filtered = 
        $parsed = [];

        foreach ($reservas as $key => $value) {
            
            $value[6] = json_decode($value[6]); // data

            $parsed[$value[0]] = $value;            
        }

        return ($parsed);
    }

    public function prepare_salidas($reservas){

        $parsed = [];

        foreach ($reservas as $key => $value) {
            
            $value[6] = json_decode($value[6]); // data

            $parsed[$value[0]] = $value;            
        }

        return $parsed;
    }
    
    public function validate($data){
        
        if(!$data)  return [];    
    }

    public function sanitize($data){

        if(!$data)  return $data;
    }

}