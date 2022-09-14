<?php 

/* activity_group(

    id INT AUTO_INCREMENT, # 0 
    type TINYINT NOT NULL, # 1
    # 1 - RESERVA
    # 2 - SALIDA
    # 3 - OTROS
    date_start DATE NOT NULL,# 2
    date_end DATE NOT NULL,# 3 
    time_start TIME,# 4
    time_end TIME,# 5
    data JSON,# 6
    PRIMARY KEY (id)
); */


    function build_salidas($reservas){        
        
       $salidas = []; $resultado = [];

       foreach ($reserva as $reserva) {

            $data = json_decode($reserva[6] );
            
            $activities = $data[5];
            $tours = $activities->{'1'};
        
            foreach ($tours as $tour) {

                // date_start(0)--date_end(1)--time_start(2)--time_end(3)--tour-id(4)
           
                $key = $e[4] . "--".$e[5] . "--".$e[6] . "--".$e[7] . "--".$e[8][0];

                // reservaid (0) pax (1)

                $value = [$e[0],$e[8][1]];

                if (!array_key_exists($key, $salidas )) {
                    
                    $salidas[$key]=[$idPax];

                }else{

                    $salidas[$key][] = $idPax;
                }


            
            }
       }
       $toursDates = array_map(function($reserva){

            $data = json_decode($reserva[6] );
           
            $activities = $data[5];
            $tours = $activities->{'1'};
            

            return array_map(fn($e)=>[[$key]=>[$value]],$tours);

       },$reservas);

       foreach ($toursDates as $dates) {

            foreach ($dates as $salidaStr=>$idPax) {

                var_dump($salidaStr);

                if (!array_key_exists($salidaStr, $salidas )) {
                    
                    $salidas[$salidaStr]=[$idPax];

                }else{

                    $salidas[$salidaStr][] = $idPax;
                }
                
            }
       }

       foreach ($salidas as $key => $value) {

            $arr=explode('--', $key);       

            $data = [

                $arr[4], // tour id - 0,
                $value[0], //id reserva
                $value[1], //pax
            ];
            $resultado[] =[null,2,$arr[0],$arr[1],$arr[2],$arr[3], json_encode($data)];

       }

       
        return $resultado;
    
    }

 
    function build_operator_activities($span, $start, $id, $tours, $pax){

       

 

        return $toursList;
    }

    function build_guiado_activities($start, $end, $id, $hotels, $pax){

      
    }

    function build_passengers(){


    }




?>