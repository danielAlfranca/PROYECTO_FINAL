<?php 

    /* 

    ESTRUCTURA TABLA
    
    id INT AUTO_INCREMENT PRIMARY KEY ,
    agent INT,
    item_type TINYINT NOT NULL,
    data JSON,
    FOREIGN KEY (agent) REFERENCES agents(id) 
    
    */



    function build_inventory(){        

        $inventory_array = [];

        $time_start= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30'];
        $time_end= ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];
        $hotel_services = ['piscina', 'restaurante','jardin','wifi'];

        $destinos = builListNames('destino',5);
        $direccion = builListNames('direccion',10);
        $paises = builListNames('pais',5);

        $empresas = buildIdLisT(1,15);
        $empresasHoteleras = randomPick($empresas, 4 );
        $tours = buildIdLisT(15,30);
        $hoteles = buildIdLisT(30,42);
        $paquetes = buildIdLisT(42,50);

        // EMPRESAS 

        foreach ($empresas as $id) {
        
            $inventory_array[] =  [

                'id'=> $id,
                'agent'=>$id,
                'item_type'=>1,
                'data'=>NULL
            ];       
        }
    
        // TOURS

        foreach ($tours as $id) {
        
            $data = [

                "tour $id", // nombre tour
                randomPick($time_start), // horario inicio
                randomPick($time_end), // horario fin
                randomPick([1,2]), // duracion
                randomPick($destinos) // destino
            ];

            $inventory_array[] =  [

                'id'=> $id,
                'agent'=>NULL,
                'item_type'=>2,
                'data'=>json_encode($data)
            ];        
        }

        // HOTELES

        foreach ($hoteles as $id){
            
            $type = randomPick([1,2,3]);

            $data = [

                "hotel $id", // nombre hotel
                $type, // tipo
                ($type == 1 ? randomPick([1,2,3,4,5]):null), // categoria
                randomPick($hotel_services,randomPick([1,2,3,4])), // services
                randomPick($direccion). ', '.randomPick($destinos).', '.randomPick($paises) // address
            ];

            $inventory_array[] =  [

                'id'=> $id,
                'agent'=>randomPick($empresasHoteleras),
                'item_type'=>3,
                'data'=>json_encode($data)
            ];               
        }

        // PAQUETES

        foreach ($paquetes as $id) {
            
            $duracion_paquete = randomPick([3,4,5,6,7]);        
            $data = [

                "paquete $id", // nombre paquete
                $duracion_paquete, // duracion dias
                randomPick($destinos,randomPick([1,2])), // categoria

                // FALTAN LOS SERVICIOS !!!!!!!!!!!!!!!!!!
            ];

            $inventory_array[] =  [

                'id'=> $id,
                'agent'=>NULL,
                'item_type'=>4,
                'data'=>json_encode($data)
            ];               
        }

        return $inventory_array;

    }



?>