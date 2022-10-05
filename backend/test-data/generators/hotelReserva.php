<?php 

include_once './generator.php';
include_once '../sections/reservas.php';
include_once '../sections/hotelReserva.php';
include_once '../sections/hotel.php';

class HotelReservasGenerator extends FakeDataGenerator {  

    
    private $paquetes;
    private $hoteles;

    public function __construct($paquetes, $hoteles){
        
        parent::__construct(HotelActivity::class);

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


?>