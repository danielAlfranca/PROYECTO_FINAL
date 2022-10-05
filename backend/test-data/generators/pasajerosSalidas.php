<?php 

include_once './generator.php';
include_once '../sections/pasajeroSalida.php';
include_once '../sections/empresa.php';
include_once '../sections/salidas.php';

class PasajerosSalidasGenerator extends FakeDataGenerator {  


    public function __construct($salidas, $empresas){
        
        parent::__construct(Passenger::class);

        $this->empresas =$empresas;
        $this->salidas = $salidas;
    }


    public function build(){

        $list = [];

        foreach ($this->salidas as $salida) {

            for ($i=0; $i < $this->randomPick([1,2,3,1,1,2,1,1,3,2,1]); $i++) { 
                
                $pasajeros = implode('.',[$this->randomPick([1,2,3,4,5]), $this->randomPick([0,0,0,0,1,2]), $this->randomPick([0,0,0,0,0,1])]);
            
                $list[]= $this->parse([
    
                    'id'=> 'nuevo', # 0 
                    'salida'=>  Salida::get_property($salida, 'id'),   
                    'pasajeros'=>$pasajeros,
                    'nombre'=>  $this->randomPick($this->lists['NOMBRES']), // 1 - NOMBRE
                    'apellidos'=> $this->randomPick($this->lists['APELLIDOS'])." ".$this->randomPick($this->lists['APELLIDOS']), // 2 - apellidos
                    'telefonos'=>  strval(rand(600000000,699999999)), //3 - telefonos
                    'emails'=>  $this->randomPick($this->lists['EMAILS']), //4 - emails               
                    'proveedor'=>Empresa::get_property($this->randomPick($this->empresas),'id')  // proveedor - 7 
                ]);
            }
           
        }
        
        return $list;
    }

  

    
} 

?>