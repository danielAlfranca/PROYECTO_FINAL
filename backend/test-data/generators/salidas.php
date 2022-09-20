<?php 


    function build_salidas($reservas, $empresas, $trabajadores){        
        
       $salidas = []; $resultado = []; $numReservas = count($reservas); $index = 0; 

       foreach ($reservas as $reserva) {

            $data = json_decode($reserva[6] );
            
            $activities = $data[5];
            $tours = $activities->{'1'};
            $indexTours = 0;
        
            foreach ($tours as $tour) {

                // date_start(0)--date_end(1)--time_start(2)--time_end(3)--tour-id(4)
           
                $key = $tour[4] . "--".$tour[5] . "--".$tour[6] . "--".$tour[7] . "--".$tour[8][0];

                //[ reservaid (0),  tourid (1), pax (2)]                

                $value = [$reserva[0],$tour[1],$tour[8][1]];

                // añado id salida

                $tour[8][2]= $numReservas + 1 + $index;

                if (!array_key_exists($key, $salidas )) {
                    
                    $salidas[$key]=[$value];

                }else{

                    $salidas[$key][] = $value;
                }
                
                $data[5]->{'1'}[$indexTours] = $tour;
                
                $indexTours++;
            }

            $reservas[$index][6] =  json_encode($data);

            $index++;
       }


       foreach ($salidas as $key => $value) {

        $arr=explode('--', $key); 
        $start =  $arr[0];
        $end =  $arr[1];
        $time_start =  $arr[2];
        $time_end =  $arr[3];
        $operator =  build_operator_activity($empresas,$start, $end, $time_start, $time_end); 
        $guiado = build_guiado_activities($trabajadores,$empresas,$start, $end, $time_start, $time_end);
        $chofer = build_chofer_activities($trabajadores,$empresas,$start, $end, $time_start, $time_end);
        $restaurant =  build_operator_activity($empresas,$start, $end, $time_start, $time_end); 

        $activities = [
            
            "6"=>$operator, 
            "4"=>$guiado,
            "5"=>$chofer,
            "7"=>$restaurant,
        ];

        $data = [
            $arr[4] , // 0 tour id
            $value , // 1 pax
            $activities //  2 activities
        ];
        
        $resultado[] =[null,2,$arr[0],$arr[1],$arr[2],$arr[3], json_encode($data)];

    }

   
    return ["salidas"=>$resultado, "reservas"=>$reservas];
    }

  /*   * activity_group(

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

 
    function build_operator_activity($empresas, $start, $end, $time_start, $time_end){ 

        return[ [
            null, //0 -group_id - id salida falta,
            1 ,// 1 - activity_index,
            6 ,// 1 - activity_type,
            rand(2,$empresas) ,// 2 -agent ,
            $start ,// 1 - date_start,
            $end ,// 1 - date_end,
            $time_start ,// 1 - time_start,
            $time_end ,// 1 - time_end,
            []       
        ]];
    }

    function build_guiado_activities($trabajadores,$empresas, $start, $end, $time_start, $time_end){

         return [[
            null, //0 -group_id - id salida falta,
            1 ,// 1 - activity_index,
            4 ,// 1 - activity_type,
            rand($empresas+1, $trabajadores+$empresas) ,// 2 -agent ,
            $start ,// 1 - date_start,
            $end ,// 1 - date_end,
            $time_start ,// 1 - time_start,
            $time_end ,// 1 - time_end,
            []       
        ]];
    }

    function build_chofer_activities($trabajadores,$empresas, $start, $end, $time_start, $time_end){

        return [[
           null, //0 -group_id - id salida falta,
           1 ,// 1 - activity_index,
           5 ,// 1 - activity_type,
           rand($empresas+1, $trabajadores+$empresas) ,// 2 -agent ,
           $start ,// 1 - date_start,
           $end ,// 1 - date_end,
           $time_start ,// 1 - time_start,
           $time_end ,// 1 - time_end,
           []       
       ]];


    }
    
    function build_restaurant_activities($trabajadores,$empresas, $start, $end, $time_start, $time_end){

        return [[
           null, //0 -group_id - id salida falta,
           1 ,// 1 - activity_index,
           5 ,// 1 - activity_type,
           rand(2,$empresas) ,// 2 -agent ,
           $start ,// 1 - date_start,
           $end ,// 1 - date_end,
           $time_start ,// 1 - time_start,
           $time_end ,// 1 - time_end,
           [

            rand(4,12)

           ]       
       ]];


    }
 




?>