<?php 

include_once './generator.php';
include_once '../sections/reservas.php';
include_once '../sections/hotelReserva.php';
include_once '../sections/hotel.php';

class HotelReservasGenerator extends FakeDataGenerator {  

    
    private $paquetes;
    private $hoteles;

    public function __construct($paquetes, $hoteles){
        
        parent::__construct(HotelReserva::class);

        $this->numberOfItems = 50;
        $this->paquetes = $paquetes;
        $this->hoteles = $hoteles;
    }


    public function build(){

        $hoteles = [];

        foreach ($this->paquetes as $paquete) {
        
            if($this->randomPick([true,false])){

                $paqueteId =  Reserva::get_property($paquete, 'id');
                $start =  Reserva::get_property($paquete, 'date_start');
                $end =    Reserva::get_property($paquete, 'date_end');
                $rooms = $this->getRooms();  
                $hotel = $this->randomPick($this->hoteles);
                $hotelId = Hotel::get_property($hotel, 'id');
                
                 $hoteles[]=$this->parse([
     
                     'id'=> 'nuevo', 
                     'habitaciones'=> $rooms, 
                     'reserva'=>  $paqueteId, 
                     'hotel'=>  $hotelId, 
                     'date_start' =>  $start,
                     'date_end' =>  $end,
                     'time_start' =>  null,
                     'time_end' =>  null,
                     'comments'=>  $this->randomPick(['avisar salida', 'menu vegano', '','', '','recogida aeropuerto', '','', '','']) //4 - emails
                 ]);
            }      
        }       

        return $hoteles;   
    } 

    private function getRooms(){

        $rooms= [1,2,3,4,5,6];
        $amount = [1,2,1,1];
        $numRooms = [1,2,1,1,1,1,2,3,1,1,2,1,1,1,2,3];
        $result = [];

        for ($i=0; $i < $this->randomPick($numRooms); $i++) { 
            
            $result[]= strval($this->randomPick($rooms)).'.'.strval($this->randomPick($amount));

        }

        return implode('-',$result);
    }

}


 /*    
    function build_tours_paquetes($getter, $paquetes, $start, $end, $salidas){     

        $tours = [];

        foreach ($paquetes as $paquete) {
        
           $paqueteId =  Paquete::get_property($paquete, 'id');
           $start =  Paquete::get_property($paquete, 'date_start');
           $end =    Paquete::get_property($paquete, 'date_end');
           $pasajeros =  Paquete::get_property($paquete, 'pasajeros');
           $startTimeStamp = strtotime($start);
           $endTimeStamp = strtotime($end);
           $numberDays = abs($endTimeStamp - $startTimeStamp)/86400;
                     

           for ($i=0; $i < $numberDays; $i++) { 

                $tour = randomPick($tours);
                $tourId = Tour::get_property($tour, 'id');
                $duracion = Tour::get_property($tour, 'duracion');
                $tourStart = date("Y-m-d", strtotime($start.' + '.strval($i).' days'));
                $tourEnd = date("Y-m-d", strtotime($date. ' + '.strval($duracion) .' days'));

                $tours[]=[

                    'id'=> 'nuevo', 
                    'pasajeros'=> $pasajeros , 
                    'paquete'=>  $paqueteId, 
                    'tour'=>  $tourId, 
                    'salida'=>  randomPick([getSalida($salidas, $start, $end, $tourId), NULL] ),
                    'date_start' =>  $tourStart,
                    'date_end' =>  $tourEnd,
                    'time_start' =>  Tour::get_property($tour, 'inicio'),
                    'time_end' =>  Tour::get_property($tour, 'fin'),
                    'comments'=>  randomPick(['recogida en hotel x', 'menu vegano', '','', '','cobro pendiente', '','', '','']) //4 - emails
                ];
            } 
        }       

        return $tours;         
    }

    function build_hoteles_paquetes($paquetes, $start, $end, $hoteles){     

        $hoteles = [];

        foreach ($paquetes as $paquete) {

            if(randomPick([true,false])){

                $paqueteId =  Paquete::get_property($paquete, 'id');
                $start =  Paquete::get_property($paquete, 'date_start');
                $end =    Paquete::get_property($paquete, 'date_end');
                $rooms = getRooms();  
                $hotel = randomPick($hoteles);
                $hotelId = Tour::get_property($tour, 'id');
                
                 $hoteles[]=[
     
                     'id'=> 'nuevo', 
                     'habitaciones'=> $rooms, 
                     'paquete'=>  $paqueteId, 
                     'hotel'=>  $hotelId, 
                     'date_start' =>  $start,
                     'date_end' =>  $end,
                     'time_start' =>  null,
                     'time_end' =>  null,
                     'comments'=>  randomPick(['avisar salida', 'menu vegano', '','', '','recogida aeropuerto', '','', '','']) //4 - emails
                 ];
            }      
        }       

        return $hoteles;         
    }

    function getDates(){

        $today = time();
        $week = (7 * 24 * 60 * 60);
        $start = randomPick(buildIdLisT(0, 21));
        $span = randomPick(buildIdLisT(2, 7));
        $start_date = date("Y-m-d");
        $start_date = date("Y-m-d", strtotime($start_date.randomPick([' - ', ' + ']).strval($start).' days'));
        $end_date = date("Y-m-d", strtotime($start_date. ' + '.strval($span) .' days'));
        return ['start'=>$start_date, 'end'=>$end_date];

    }

    function getTimes(){

        $time= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];

        return ['start'=>randomPick($times), 'end'=>randomPick($times)];
    }

    function getSalida($salidas, $start, $end, $tourId){

        $selected = NULL;
        foreach ($salidas as $salida) {
            
            if( Salida::get_property($salida,'date_start')==$start && 
                Salida::get_property($salida,'date_end')==$end && 
                Salida::get_property($salida,'tour')==$tourId ){

                    $selected = Salida::get_property($salida,'id');
                    break;
            }
        }

        return $selected;
    }

    function getRooms(){

        $rooms= [1,2,3,4,5,6];
        $amount = [1,2,1,1];
        $numRooms = [1,2,1,1,1,1,2,3,1,1,2,1,1,1,2,3];
        $result = [];

        for ($i=0; $i < randomPick($numRooms); $i++) { 
            
            $result[]= [randomPick($rooms), randomPick($amount)];
        }

        return result;

    }


    function build_reservas1($num_reservas, $agents, $names, $last_names, $emails, $tours, $hotels){        

        $reservas = [];
        $destinos = builListNames('destino',10);
        $num_empresas = $agents[0];
        $trabajadores = $agents[1];
        $empresas = buildIdLisT(2, $num_empresas+1); // +1 porque agent con id 1 es sin agente
        $trabajadores = buildIdLisT($num_empresas+2, $num_empresas+1 + $trabajadores); // +1 porque agent con id 1 es sin agente
       

        for ($i=0; $i < $num_reservas; $i++) { 
            
            $id = $i+1;
            $today = time();
            $week = (7 * 24 * 60 * 60);
            $start = randomPick(buildIdLisT(0, 21));
            $span = randomPick(buildIdLisT(2, 7));
            $start_date = date("Y-m-d");
            $start_date = date("Y-m-d", strtotime($start_date.randomPick([' - ', ' + ']).strval($start).' days'));
            $end_date = date("Y-m-d", strtotime($start_date. ' + '.strval($span) .' days'));
            $pasajeros = [randomPick(buildIdLisT(1, 5)), randomPick([0,0,0,0,1,2]), randomPick([0,0,0,0,0,1])];
            
            $type = randomPick([0,0,1,1,0,1]);
            $agent = randomPick([[2],$empresas][$type]); 
            // 2 es la propia agencia osea una empresa

            $data = [

                randomPick($names), // 0 - NOMBRE
                randomPick($last_names). " ".randomPick($last_names), // 1 -APELLIDOS
                randomPick($destinos), // 2 - DESTINO
                $pasajeros , // 3 - PASAJEROS
                $agent, // 4 - AGENTE
                build_activities($span,$start_date,$end_date,$id,$tours, $hotels,$pasajeros), // 5 - SERVICIOS,
                [rand(600000000,699999999)], //6 - phones 
                [randomPick($emails)], // 7 - emails 

            ];

            $reserva = [$id,1, $start_date, $end_date, null, null, json_encode($data)];
            $reservas[]= $reserva;
        }

        return $reservas;

    }

    function build_activities($span, $start, $end, $id, $tours, $hotels, $pax){

        $toursAct = build_tours_activities($span, $start,$id,$tours,$pax);
        $hotel = build_hotels_activities($start, $end, $id, $hotels, $pax);
        $hotel[1] = count($toursAct) + 1;

        return [

            '1'=>$toursAct,
            '2'=>randomPick([[$hotel],[]]),
            '3'=>[]
        ];
    }

   /*  group_id INT,
    activity_index TINYINT NOT NULL,
    activity_type TINYINT NOT NULL,
    agent INT NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    time_start TIME,
    time_end TIME,
    data JSON,
    PRIMARY KEY (group_id,activity_index,activity_type),
    FOREIGN KEY (group_id) REFERENCES activity_group(id),
    FOREIGN KEY (agent) REFERENCES agents(id) */

    /* function build_tours_activities($span, $start, $id, $tours, $pax){

        $toursList = [];
        for ($i=0; $i < $span; $i++) { 
            
            $tour = randomPick($tours);
            $data = json_decode($tour[3]);
            $duracion = $data[3]-1;// duracion
            $date = date("Y-m-d", strtotime($start.' + '.strval($i).' days'));
            $date_end = date("Y-m-d", strtotime($date. ' + '.strval($duracion) .' days'));
            $toursList  [] = [

                $id, // group_id 0
                $i +1, // activity_index 1
                1, // activity_type - tour 2
                1, // agent - de momento sin agente, 3
                $date, // date_start, 4
                $date_end, // date_end 5,
                $data[1], // time_start 6,
                $data[2], // time_end 7,
                [ // 8
                    $tour[0], //  tour id
                    $pax, //  passengers
                ]
            ];

        }

        return $toursList;
    }

    function build_hotels_activities($start, $end, $id, $hotels, $pax){

        $hotel = randomPick($hotels);
        return [

            $id, // group_id 
            0, // activity_index - temp
            2, // activity_type - hotel
            1, // agent - de momento sin agente,
            $start, // date_start,
            $end, // date_end,
            null, // time_start,
            null, // time_end,
            [
                $hotel[0], //  hotel id
                [[1,1]] // habitaciones
            ]

            ];
    }

    function build_traslados_activities(){


    } */



?>