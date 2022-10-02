<?php 

include_once './generator.php';
include_once '../sections/hotel.php';
include_once '../sections/tour.php';

class ToursGenerator extends FakeDataGenerator {  


    public function __construct(){
        
        parent::__construct(Tour::class);

        $this->numberOfItems = count($this->lists['TOURS']);
    }


    public function build(){

        $list = [];
        $time_start= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30'];
        $time_end= ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];

        for ($i=0; $i < $this->numberOfItems; $i++) { 
            
            $tipo = $this->randomPick(["1","2","3"]);
            $list[]= $this->parse([

                'id'=> "nuevo", // id
                'nombre'=> $this->lists['TOURS'][$i], // nombre
                'inicio'=> $this->randomPick($time_start), // inicio
                'fin'=> $this->randomPick($time_end), // fin
                'duracion'=> $this->randomPick([1,1,1,1,1,1,1,1,2]), // duracion
                'destino'=> $this->randomPick($this->lists['DESTINOS']),// destino   
                'user'=>1  //  
            ]);
        }
        
        return $list;
    }

  

    
} 

?>