<?php 

include_once './generator.php';
include_once '../sections/salidas.php';

class SalidasGenerator extends FakeDataGenerator {  

    private $tours;
    public function __construct($tours){
        
        parent::__construct(Salida::class);

        $this->numberOfItems = 0;
  
        $this->tours = $tours;
    }


    public function build(){

        $salidas = [];

        foreach ($this->tours as $tour) {

            $arr = [];

            foreach (['date_start','date_end','time_start','time_end','tour'] as $keyName) {

                $arr[$keyName]= TourActivity::get_property($tour, $keyName);
                
            }

            $str = implode('--',$arr);
   
            if(!array_key_exists($str,$salidas)) $salidas[$str]=$this->parse([

                'id'=>'nuevo', # 0 
                'tour'=> $arr['tour'],
                'date_start'=> $arr['date_start'],
                'date_end' =>$arr['date_end'],
                'time_start' => $arr['time_start'],
                'time_end' =>$arr['time_end'],
                'comments' => '',
                'user'=>1
            ]);           

        }

        return array_values($salidas);
    }    
} 


?>