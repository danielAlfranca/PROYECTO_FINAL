<?php 

include_once './generator.php';
include_once '../sections/salidas.php';
include_once '../sections/trabajador.php';
include_once '../sections/guiadoSalida.php';

class GuiadoSalidasGenerator extends FakeDataGenerator {  

    private $salidas;
    public function __construct($salidas, $trabajadores){
        
        parent::__construct(GuiadoActivity::class);

        $this->numberOfItems = 0;
  
        $this->salidas = $salidas;
        $this->trabajadores = $trabajadores;
    }


    public function build(){

        $list = [];

        $guias = array_filter($this->trabajadores, fn($e)=>Trabajador::get_property($e, 'tipo')==1);

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





?>