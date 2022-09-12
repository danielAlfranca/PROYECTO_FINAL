<?php 


    function build_reservas($num_reservas, $agents, $names, $last_names, $emails, $tours, $hotels){        

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
            
            $type = randomPick([0,0,1,1,2]);
            $agent = randomPick([[2],$empresas,$trabajadores][$type]); 
            // 2 es la propia agencia osea una empresa

            if($type==0 || $type==1) $agent = [$agent, 1];
            if($type==2) $agent = [$agent, 2];

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

    function build_tours_activities($span, $start, $id, $tours, $pax){

        $toursList = [];
        for ($i=0; $i < $span; $i++) { 
            
            $tour = randomPick($tours);
            $data = json_decode($tour[3]);
            $duracion = $data[3]-1;// duracion
            $date = date("Y-m-d", strtotime($start.' + '.strval($i).' days'));
            $date_end = date("Y-m-d", strtotime($date. ' + '.strval($duracion) .' days'));
            $toursList  [] = [

                $id, // group_id 
                $i +1, // activity_index
                1, // activity_type - tour
                1, // agent - de momento sin agente,
                $date, // date_start,
                $date_end, // date_end,
                $data[1], // time_start,
                $data[2], // time_end,
                [
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


    }




?>