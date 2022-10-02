<?php 

include_once './generator.php';
include_once '../sections/salidas.php';
include_once '../sections/trabajador.php';
include_once '../sections/choferSalida.php';

class ChoferSalidasGenerator extends FakeDataGenerator {  

    private $salidas;
    public function __construct($salidas, $trabajadores){
        
        parent::__construct(ChoferSalida::class);

        $this->numberOfItems = 0;
  
        $this->salidas = $salidas;
        $this->trabajadores = $trabajadores;
    }


    public function build(){

        $list = [];

        $guias = array_filter($this->trabajadores, fn($e)=>Trabajador::get_property($e, 'tipo')==2);

        foreach ($this->salidas as $salida) {
            
            $list[]=$this->parse([

                'id'=> 'nuevo', # 0 
                'salida'=>  Salida::get_property($salida, 'id'),    
                'proveedor'=>  Trabajador::get_property($this->randomPick($guias), 'id'), 
                'comments'=>  '',
            ]);
        }

        return $list;
    }    
} 

/* 
    function build_salidas($tours){

        $salidas = [];

        foreach ($tours as $tour) {

            $arr = [];

            foreach (['date_start','date_end','time_start','time_end','tour'] as $keyName) {

                $arr[]= TourPaquete::get_property($tour, $keyName);
            }

            $str = implode('--',$arr);
   
            if(!array_key_exists($str,$salidas)) $salidas[$str]=[

                'id'=>'nuevo', # 0 
                'tour'=> $arr[4],
                'date_start'=> $arr[0],
                'date_end' =>$arr[1],
                'time_start' => $arr[2],
                'time_end' =>$arr[3],
                'comments' => ''
            ];           

        }

        return array_values($salidas);
    }

    function build_operators($salidas,$empresas){

        $list = [];

        foreach ($salidas as $salida) {
            
            $list[]=[

                'id'=> 'nuevo', # 0 
                'salida'=>  Salida::get_property($salida, 'id'),    
                'proveedor'=>  Empresa::get_property(randomPick($empresas), 'id'), 
                'comments'=>  '',
            ];
        }
    }

    function build_guias($salidas,$trabajadores){

        $list = [];
        $guias = array_filter($trabajadores, fn($e)=>Trabajador::get_property($e, 'tipo')==1);

        foreach ($salidas as $salida) {
            
            $list[]=[

                'id'=> 'nuevo', # 0 
                'salida'=>  Salida::get_property($salida, 'id'),    
                'proveedor'=>  Trabajador::get_property(randomPick($guias), 'id'), 
                'comments'=>  '',
            ];
        }
    }

    function build_chofers($salidas,$trabajadores){

        $list = [];
        $chofers = array_filter($trabajadores, fn($e)=>Trabajador::get_property($e, 'tipo')==2);

        foreach ($salidas as $salida) {
            
            $list[]=[

                'id'=> 'nuevo', # 0 
                'salida'=>  Salida::get_property($salida, 'id'),    
                'proveedor'=>  Trabajador::get_property(randomPick($chofers), 'id'), 
                'comments'=>  '',
            ];
        }
    }

    function build_pasajeros($salidas,$tours){

        $paxCONreserva = []; $paxSINreserva = [];$toursUpdated = [];
   
        foreach ($tours as $tour) {
            
            if(strtotime(TourPaquete::get_property($e, 'date_start')) <= strtotime('now')){

                foreach ($salidas as $salida) {
                    
                    foreach (['date_start','date_end','time_start','time_end','tour'] as $label) {

                        if (Salida::get_property($salida, $label)==TourPaquete::get_property($tour, $label)) {

                            $updated = TourPaquete::set_property($tour, 'salida',Salida::get_property($salida, 'id'));
                            $toursUpdated[] = $updated;
                            $paxCONreserva[] = create_pasajero_con_reserva($tour,$salida);

                            for ($i=0; $i < randomPick([0,1,2,1,3]); $i++) { 

                                $paxSINreserva[] = create_pasajero_sin_reserva($tour,$salida);
                            }
                            
                           
                        }
                    }  
                }
            }
        }

        return [

            'toursPaqueteUpdated'=>$toursUpdated,
            'paxConReserva'=>$paxCONreserva,
            'paxSinReserva'=>$paxSINreserva,

        ]
    }

    function create_pasajero_con_reserva($tour,$salida){

        return [

            'id'=>'nuevo', # 0 
            'tour'=> TourPaquete::get_property($tour, 'id'),
            'salida'=> SalidaPaquete::get_property($salida, 'id'),
            'pasajeros' =>TourPaquete::get_property($tour, 'pasajeros')
        ]
    }

    function create_pasajero_sin_reserva($tour,$salida, $names){

        return [

            'id'=>'nuevo', # 0 
            'salida'=> SalidaPaquete::get_property($salida, 'id'),
            'pasajeros' => [randomPick(buildIdLisT(1, 5)), randomPick([0,0,0,0,1,2]), randomPick([0,0,0,0,0,1])],
            'nombre'=>  randomPick($names), //
            'apellidos'=>  randomPick($last_names). " ".randomPick($last_names),
            'telefonos'=>  rand(600000000,699999999), 
            'emails'=>  randomPick($emails) 
            'proveedor' =>Empresa::get_property(randomPick($empresas), 'id')
        ]
    }

    function build_salidas1($reservas, $empresas, $trabajadores){        
        
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

 
    /* function build_operator_activity($empresas, $start, $end, $time_start, $time_end){ 

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


    } */
 




?>