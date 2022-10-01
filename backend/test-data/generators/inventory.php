<?php 


    function build_empresas($num, $empresas,$emails, $direcciones){

        $limit = $num ;
        $list = [];

        for ($i=0; $i < CANTIDAD['EMPRESAS']; $i++) { 
            
            $list[]= buildItem([

                'id'=>  "nuevo", // id
                'nombre'=>  NOMBRES['EMPRESAS'][$i].randomPick([" S.L.", " S.A."," corp.",  " S.A.C"]),
                'documento'=>  strval(rand(111111,999999)),// doc
                'telefonos'=>  strval(rand(600000000,699999999)), // phones 
                'emails'=>  randomPick(NOMBRES['EMAILS']), // emails
                'direccion'=>  randomPick(NOMBRES['DIRECCIONES']) // address

            ],CLASS_SECTION['EMPRESAS']);
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

                    'id'=>   "nuevo", // id
                    'nombre'=>  randomPick($names) , // name
                    'apellidos'=>  randomPick($last_names). " ".randomPick($last_names),
                    'documento'=>  strval(rand(111111,999999)),// doc
                    'telefonos'=>  strval(rand(600000000,699999999)), // phones 
                    'emails'=>  randomPick($emails), // emails
                    'tipo'=>  $types[$key], // tipo,
                    'regimen'=>  randomPick(["1","2"]), // regimen,
                ];
            }         
        } 
        
        return $list; 
    }

    function build_hoteles($num, $hoteles,$emails, $direcciones, $empresas){

        $limit = $num;
        $list = [];
        $tipos = ["1","2","3"];
       
       

        for ($i=0; $i < $limit; $i++) { 
            
            $tipo = randomPick($tipos);

            $list[]=[

                'id'=>  "nuevo", // id 0
                'nombre'=> $hoteles[$i], // nombre 1
                'tipo'=> $tipo, // tipo 2
                'phones'=> strval(rand(600000000,699999999)), // phones  3
                'emails'=> randomPick($emails), // emails 4
                'address'=> randomPick($direcciones), // address 5
                'propietario'=> Empresa::get_property(randomPick($empresas ), 'id'), // propietario 6
                'categoria'=> $tipo == 1 ? randomPick(["1",'2','3','4','5']):null // categoria 7

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

               'id'=> "nuevo", // id
               'nombre'=> $tours[$i], // nombre
               'inicio'=> randomPick($time_start), // inicio
               'fin'=> randomPick($time_end), // fin
               'duracion'=> randomPick([1,1,1,1,1,1,1,1,2]), // duracion
               'destino'=> randomPick($destinos)// destino                
            ];
        }
        
        return $list; 
    }

   



?>