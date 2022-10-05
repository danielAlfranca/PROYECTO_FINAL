<?php 

include_once './generator.php';
include_once '../sections/salidas.php';
include_once '../sections/empresa.php';
include_once '../sections/operadorSalida.php';

class OperadorSalidasGenerator extends FakeDataGenerator {  

    
    public function __construct($salidas, $empresas){
        
        parent::__construct(OperadorActivity::class);

        $this->numberOfItems = 0;
  
        $this->salidas = $salidas;
        $this->empresas = $empresas;
    }


    public function build(){

        $list = [];

        foreach ($this->salidas as $salida) {
            
            $list[]=$this->parse([

                'id'=> 'nuevo', # 0 
                'salida'=>  Salida::get_property($salida, 'id'),    
                'proveedor'=>  Empresa::get_property($this->randomPick( $this->empresas), 'id'), 
                'comments'=>  '',
            ]);
        }

        return $list;
    }    
} 
?>