<?php 

include_once './generator.php';
include_once '../sections/reservas.php';
include_once '../sections/tourReserva.php';
include_once '../sections/tour.php';

class TourReservasGenerator extends FakeDataGenerator {  

    
    private $paquetes;
    private $tours;

    public function __construct($paquetes, $tours){
        
        parent::__construct(TourActivity::class);

        $this->numberOfItems = 50;
        $this->paquetes = $paquetes;
        $this->tours = $tours;
    }


    public function build(){

        $tours = [];

        foreach ($this->paquetes as $paquete) {
        
           $paqueteId =  Reserva::get_property($paquete, 'id');
           $start =  Reserva::get_property($paquete, 'date_start');
           $end =    Reserva::get_property($paquete, 'date_end');
           $pasajeros =  Reserva::get_property($paquete, 'pasajeros');
           $startTimeStamp = strtotime($start);
           $endTimeStamp = strtotime($end);
           $numberDays = abs($endTimeStamp - $startTimeStamp)/86400;
                     

            for ($i=0; $i < $numberDays; $i++) { 

                $tour = $this->randomPick($this->tours);
                $tourId = Tour::get_property($tour, 'id');
                $duracion = Tour::get_property($tour, 'duracion') -1;
                $tourStart = date("Y-m-d", strtotime($start.' + '.strval($i).' days'));
                $tourEnd = date("Y-m-d", strtotime($tourStart. ' + '.strval($duracion) .' days'));

                $tours[]=$this->parse([

                    'id'=> 'nuevo', 
                    'pasajeros'=> $pasajeros , 
                    'reserva'=>  $paqueteId, 
                    'tour'=>  $tourId, 
                    'salida'=>  null,
                    'date_start' =>  $tourStart,
                    'date_end' =>  $tourEnd,
                    'time_start' =>  Tour::get_property($tour, 'inicio'),
                    'time_end' =>  Tour::get_property($tour, 'fin'),
                    'pasajeros_salida'=> null, 
                    'comments_salida'=> $this->randomPick(['recogida en hotel x', 'menu vegano', '','', '','cobro pendiente', '','', '','']), 
                ]);
            } 
        }       

        return $tours;   
    } 

}


?>