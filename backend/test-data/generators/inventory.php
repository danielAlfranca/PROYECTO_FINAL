<?php 


    function build_inventory($num_empresas,$num_trabajadores,$emails, $names){        

        $inventory_array = [];

        $time_start= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30'];
        $time_end= ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];
        $hotel_services = ['piscina', 'restaurante','jardin','wifi'];

        $destinos = builListNames('destino',5);
        $direccion = builListNames('direccion',10);
        $paises = builListNames('pais',5);

        $empresas = buildIdLisT(1,$num_empresas);
        $empresasHoteleras = randomPick($empresas, 4 );
        $tours = buildIdLisT(1,15);
        $hoteles = buildIdLisT(1,8);
        $paquetes = buildIdLisT(1,10);       

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

        for ($id=$num_empresas+1; $id <=$num_empresas+1+$num_trabajadores ; $id++) { 

            $data = [
                randomPick($names) . ', apellido 1 apellido 2', // name
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