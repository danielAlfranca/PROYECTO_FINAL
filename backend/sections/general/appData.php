<?php 


class AppData{   
    
    private $connection;

    public function __construct(){

        $this->connection = Database::connect();
    }

    
    public function dataSet($dates=false){

        $user = $this->getUserID();
        $connection = $this->connection;
        $sections = [];
        $dates =  $this->getDates($dates);

        // primero inventario
        
        $inventario = ['empresa'=> Empresa::class,'tour'=> Tour::class,'trabajador'=> Trabajador::class,'hotel'=> Hotel::class ];

        foreach ($inventario as $key => $ClassRef) {
            
            $manager = new $ClassRef();
         
            $items = $manager->dataSet('user',$user);

            if($items!==false) $sections[$key] = $this->indexArrayByID($items);

            else return false;
        } 
        
        // luego reservas

        $manager = new Reserva();

        $items = $manager->dataSet('user',$user, $dates);

        if($items!==false) $sections['reserva'] = $this->indexArrayByID($items);

        else{ return false; }

        // luego actividades de reserva

        $activities =  ['tourActivity'=>new TourActivity(), 'hotelActivity'=>new HotelActivity()];

        foreach ($activities as $key => $manager) {

            $activitiesType = [];
    
            foreach ($sections['reserva'] as $id => $reserva) {
                
                $actividadesReserva = $manager->dataSet('reserva',$id);
    
                if($actividadesReserva !==false) foreach ($actividadesReserva  as $actividad) {
                    
                    $activitiesType []= $actividad;
    
                }else return false;           
            }
    
            $sections[$key] = $this->indexArrayByID($activitiesType);           
        } 
        
        // luego salidas

        $manager = new Salida();
        $items = $manager->dataSet('user',$user,$dates);

        if($items!==false) $sections['salida'] = $this->indexArrayByID($items);

        else{ return false; }


        // luego actividades salida


        $activities =  ['operadorActivity'=>new OperadorActivity(), 'guiadoActivity'=>new GuiadoActivity(),'choferActivity'=>new ChoferActivity()];

        foreach ($activities as $key => $manager) {

            $activitiesType = [];
    
            foreach ($sections['salida'] as $id => $salida) {
                
                $actividadesSalida = $manager->dataSet('salida',$id);
    
                if($actividadesSalida !==false) foreach ($actividadesSalida  as $actividad) {
                    
                    $activitiesType []= $actividad;
    
                }else return false;           
            }
    
            $sections[$key] = $this->indexArrayByID($activitiesType);           
        } 

        // luego pasajeros no clientes

        $manager = new Passenger();
        $pasajeros = [];
     
        foreach ($sections['salida'] as $id => $salida) {
                
            $paxSalida = $manager->dataSet('salida',$id);

            if($paxSalida !==false) foreach ($paxSalida  as $pax) {
                
                $pasajeros []= $pax;

            }else return false;           
        }

        $sections['passenger'] = $this->indexArrayByID($pasajeros);
    
        return $sections;
    }

    private function indexArrayByID($list){

        $parsed = [];

        foreach ($list as $key => $value) {
            
            $parsed[$value[0]] = $value;            
        }

        return $parsed;
    }

    private function getUserID(){

        return 1;
    }

    private function getDates($dates){   

        if( $dates == 'week' ) return [ 'start'=> date('Y-m-d', strtotime('this week')) ];

        if( $dates == '2 weeks') return [ 'start'=> date('Y-m-d', strtotime('2 weeks ago')) ];

        if( $dates == 'month') return [ 'start'=> date('Y-m-d', strtotime(date('Y-m')." -1 month"))  ];

        if(  $dates == '2 months') return [ 'start'=> date('Y-m-d', strtotime(date('Y-m')." -1 month"))  ];

        if( $dates!= false && is_array($dates)){
            
            $parsed = [];
            
            if(array_key_exists('start', $dates)){

                $parsed['start']=date('Y-m-d', strtotime($dates['start']));
            }

            if(array_key_exists('end', $dates)){

                $parsed['end']=date('Y-m-d', strtotime($dates['end']));
            }

            return $parsed;
        
        }

        return $this->getDates('month');        
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