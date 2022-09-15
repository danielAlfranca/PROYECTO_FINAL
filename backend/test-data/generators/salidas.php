<?php 


    function build_salidas($reservas, $empresas, $trabajadores){        
        
       $salidas = []; $resultado = [];

       foreach ($reservas as $reserva) {

            $data = json_decode($reserva[6] );
            
            $activities = $data[5];
            $tours = $activities->{'1'};
        
            foreach ($tours as $tour) {

                // date_start(0)--date_end(1)--time_start(2)--time_end(3)--tour-id(4)
           
                $key = $tour[4] . "--".$tour[5] . "--".$tour[6] . "--".$tour[7] . "--".$tour[8][0];

                //[ reservaid (0),  tourid (1), pax (2)]

                $value = [$reserva[0],$tour[0],$tour[8][1]];

                if (!array_key_exists($key, $salidas )) {
                    
                    $salidas[$key]=[$value];

                }else{

                    $salidas[$key][] = $value;
                }
            
            }
       }


       foreach ($salidas as $key => $value) {

        $arr=explode('--', $key);  
        $operator =  build_operator_activity($empresas); 
        $guiado = build_guiado_activities($trabajadores,$empresas);
        $activities = [ "1"=>$operator, "2"=>$guiado];

        $data = [
            $arr[4] , // 0 tour id
            $value , // 1 pax
            $activities //  2 activities
        ];
        
        $resultado[] =[null,2,$arr[0],$arr[1],$arr[2],$arr[3], json_encode($data)];

    }

   
    return $resultado;
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

 
    function build_operator_activity($empresas){ 

        return [

            rand(2,$empresas)
        ];
    }

    function build_guiado_activities($trabajadores,$empresas){

        return [
       
            rand($empresas+1, $trabajadores+$empresas+1)
        ];
      
    }

 




?>