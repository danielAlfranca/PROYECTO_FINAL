<?php 

include_once './generator.php';
include_once '../sections/reservas.php';
include_once '../sections/empresa.php';

class ReservasGenerator extends FakeDataGenerator {  

    
    private $empresas;
    public function __construct($empresas){
        
        parent::__construct(Reserva::class);

        $this->numberOfItems = 60;
        $this->empresas = $empresas;
    }


    public function build(){

        $list = [];

        for ($i=0; $i < $this->numberOfItems; $i++) { 

            $pasajeros = implode('.',[$this->randomPick([1,2,3,4,5]), $this->randomPick([0,0,0,0,1,2]), $this->randomPick([0,0,0,0,0,1])]);
            $dates = $this->getDates();
            $times = $this->randomPick([$this->getTimes(),false, false]);
            
            $list[]= $this->parse([

                'id'=> 'nuevo', // 0 - id
                'nombre'=>  $this->randomPick($this->lists['NOMBRES']), // 1 - NOMBRE
                'apellidos'=> $this->randomPick($this->lists['APELLIDOS'])." ".$this->randomPick($this->lists['APELLIDOS']), // 2 - apellidos
                'telefonos'=>  strval(rand(600000000,699999999)), //3 - telefonos
                'emails'=>  $this->randomPick($this->lists['EMAILS']), //4 - emails
                'destino'=>$this->randomPick($this->lists['DESTINOS']),// destino   -2 
                'pasajeros'=>$pasajeros, // pasajeros - 2
                'date_start'=>$dates['start'], // date_start -3
                'date_end'=>$dates['end'], // date_end -4
                'time_start'=>$times ? $times['start']:null, // time_start -5
                'time_end'=>$times ? $times['end']:null, // time_start -6
                'proveedor'=>Empresa::get_property($this->randomPick($this->empresas),'id'),  // proveedor - 7 
                'user'=>1  // proveedor - 7              
            ]);
        }
        
        return $list;
    }

    public function insert($items){

        $instance = new $this->section();
        $inserted = [];        
  
        foreach ($items as $item) {
            
            $data = ['reserva'=>$item,'hoteles'=>[],'tours'=>[]];
            $inserted[] = $instance->save($data);            

        }

        return $inserted;
    }
    
    public function getDates(){

        $today = time();
        $week = (7 * 24 * 60 * 60);
        $start = $this->randomPick(range(0,60));
        $span = $this->randomPick(range(2, 8));
        $start_date = date("Y-m-d");
        $start_date = date("Y-m-d", strtotime($start_date.$this->randomPick([' - ', ' + ']).strval($start).' days'));
        $end_date = date("Y-m-d", strtotime($start_date. ' + '.strval($span) .' days'));
        return ['start'=>$start_date, 'end'=>$end_date];
    
    }
    
    public function getTimes(){
    
        $times= ['07:00', '08:00','09:00','10:00','11:00','12:00','07:30', '08:30','09:30','10:30','11:30','12:30','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30'];
    
        return ['start'=>$this->randomPick($times), 'end'=>$this->randomPick($times)];
    }
} 


?>