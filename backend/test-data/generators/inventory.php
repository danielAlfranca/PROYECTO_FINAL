<?php 


    function build_empresas($num, $empresas,$emails, $direcciones){

        $limit = $num ;
        $list = [ // empresa 1 es sin empresa

           [ "nuevo",
            "Sin empresa asociada",
            " ",
            "",
            "",
            ""],
            [
                "nuevo",
                "mi empresa ",
                " ",
                "",
                "",
                ""
            ]
        ];

        for ($i=0; $i < $limit; $i++) { 
            
            $list[]=[

                "nuevo", // id
                $empresas[$i].randomPick([" S.L.", " S.A."," corp.",  " S.A.C"]),
                strval(rand(111111,999999)),// doc
                strval(rand(600000000,699999999)), // phones 
                randomPick($emails), // emails
                randomPick($direcciones) // address
            ];
        }
        
        return $list; 
    }

    function build_trabajadores($numGuias, $numChoferes, $numAdim, $names,$last_names, $emails, $direcciones){

        $list = [];
        $types = ["1","2","3"];
        $limits = [$numGuias, $numChoferes, $numAdim];

        foreach ($limits as $key=>$limit) {

            for ($i=0; $i < $limit; $i++) { 
                
                $list []=[

                    "nuevo", // id
                    randomPick($names) , // name
                    randomPick($last_names). " ".randomPick($last_names),
                    strval(rand(111111,999999)),// doc
                    strval(rand(600000000,699999999)), // phones 
                    randomPick($emails), // emails
                    $types[$key], // tipo,
                    randomPick(["1","2"]), // regimen,
                ];
            }         
        } 
        
        return $list; 
    }

    function build_hoteles($num, $hoteles,$emails, $direcciones, $empresas){

        $limit = $num;
        $list = [];
        $tipos = ["1","2","3"];
        $idsEmpresas = buildIdLisT(1,count($empresas)-1);
       

        for ($i=0; $i < $limit; $i++) { 
            
            $tipo = randomPick($tipos);

            $list[]=[

                "nuevo", // id 0
                $hoteles[$i], // nombre 1
                $tipo, // tipo 2
                strval(rand(600000000,699999999)), // phones  3
                randomPick($emails), // emails 4
                randomPick($direcciones), // address 5
                randomPick($idsEmpresas ), // propietario 6
                $tipo == 1 ? randomPick(["1",'2','3','4','5']):null // categoria 7

            ];


        }
        
        return $list; 
    }

    function build_tours($num, $tours,$destinos){

        $limit = $num;
        $list = [];
        $time_start= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30'];
        $time_end= ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];
       

        for ($i=0; $i < $limit; $i++) { 
            
            $list[]=[

                "nuevo", // id
                $tours[$i], // nombre
                randomPick($time_start), // inicio
                randomPick($time_end), // fin
                randomPick([1,1,1,1,1,1,1,1,2]), // duracion
                randomPick($destinos)// destino                
            ];
        }
        
        return $list; 
    }

    function build_inventory($num_empresas,$num_trabajadores,$emails, $names, $last_names){        

        $inventory_array = [];

        $time_start= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30'];
        $time_end= ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];
        $hotel_services = ['piscina', 'restaurante','jardin','wifi'];

        $destinos = builListNames('destino',5);
        $direccion = builListNames('direccion',10);
        $paises = builListNames('pais',5);

        $empresas = buildIdLisT(1,$num_empresas);
        $trabajadores = buildIdLisT($num_empresas+1,$num_empresas+$num_trabajadores+1);
        $empresasHoteleras = randomPick($empresas, 4 );
        $initTours = $trabajadores[count($trabajadores)-1]+1;
        $tours = buildIdLisT($initTours,$initTours+8);
        $initHoteles = $tours[count($tours)-1]+1;
        $hoteles = buildIdLisT($initHoteles, $initHoteles+14);
        $initPaquetes = $hoteles[count($hoteles)-1]+1;
        $paquetes = buildIdLisT($initPaquetes, $initPaquetes+12);

        // EMPRESAS 

        for ($id=1; $id <= $num_empresas ; $id++) { 
            
            $data = [
                'empresa '.$id, // name
                rand(111111,999999),// doc
                randomAddress($direccion,$destinos,$paises),// address
                [rand(600000000,699999999)], // phones 
                [randomPick($emails), randomPick($emails)], // emails 
            ];
        
            $inventory_array[] =  [

                $id,// id
                $id+1,// agent !!!!!! + 1 porque el id 1 en agents es para sin agente
                1,// type
                json_encode($data),
                FALSE,// hidden
            ];       
        }

        // trabajadores  

        foreach ($trabajadores as $id)  { 

            $data = [
                randomPick($names) . ', '. randomPick($last_names). " ".randomPick($last_names), // name
                rand(111111,999999),// doc
                [rand(600000000,699999999)], // phones 
                [randomPick($emails)], // emails 
                randomPick([1,2,3]), // tipo
                randomPick([1,2])//regimen
            ];
        
            $inventory_array[] =  [

                $id,// id
                $id+1,// agent !!!!!! + 1 porque el id 1 en agents es para sin agente
                2,// type
                json_encode($data), //data
                FALSE,// hidden
            ];       
           
        }
       
        // TOURS        

        foreach ($tours as $id) {
        
            $data = [

                "tour $id", // nombre tour 0
                randomPick($time_start), // horario inicio 1
                randomPick($time_end), // horario fin 2
                randomPick([1,2]), // duracion 3
                randomPick($destinos) // destino 4
            ];

            $inventory_array[] =  [

                $id,// id
                1,// agent
                4,// type
                json_encode($data),
                FALSE,// hidden
            ];                
        }

        // HOTELES

        foreach ($hoteles as $id){
            
            $type = randomPick([1,2,3]);

            $data = [

                "hotel $id", // nombre hotel 0
                $type, // tipo 1
                ($type == 1 ? randomPick([1,2,3,4,5]):null), // categoria 2
                randomPick($hotel_services,randomPick([1,2,3,4])), // services 3
                randomAddress($direccion,$destinos,$paises), // address 4
                randomPick($empresasHoteleras), // propietario 5
                [rand(600000000,699999999)], // phones 6
                [randomPick($emails)], // emails 7
            ];

            $inventory_array[] =  [

                $id,// id
                1 ,// agent !!!!!!  el id 1 en agents es para sin agente
                3,// type
                json_encode($data),
                FALSE,// hidden
            ];     
             
        }

        // PAQUETES

        foreach ($paquetes as $id) {
            
            $duracion_paquete = randomPick([3,4,5,6,7]);        
            $data = [

                "paquete $id", // nombre paquete
                $duracion_paquete, // duracion dias
                randomPick($destinos,randomPick([1,2])), // destino

                // FALTAN LOS SERVICIOS !!!!!!!!!!!!!!!!!!
            ];

            $inventory_array[] =  [

                $id,// id
                1,// agent
                5,// type
                json_encode($data),
                FALSE,// hidden
            ];                          
        }

        return $inventory_array;

    }



?>