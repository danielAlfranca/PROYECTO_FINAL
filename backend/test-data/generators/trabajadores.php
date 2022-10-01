<?php 

include_once './generator.php';
include_once '../sections/trabajador.php';

class TrabajadoresGenerator extends FakeDataGenerator {  


    public function __construct(){
        
        parent::__construct(Trabajador::class);

        $this->numberOfItems = 21;
    }


    public function build(){

        $list = [];

        for ($i=0; $i < $this->numberOfItems; $i++) { 
            
            $list[]= $this->parse([

                'id'=>   "nuevo", // id
                'nombre'=>  $this->randomPick($this->lists['NOMBRES']) , // name
                'apellidos'=>  $this->randomPick($this->lists['APELLIDOS'])." ".$this->randomPick($this->lists['APELLIDOS']),
                'documento'=>  strval(rand(111111,999999)),// doc
                'telefonos'=>  strval(rand(600000000,699999999)), // phones 
                'emails'=>  $this->randomPick($this->lists['EMAILS']), // emails
                'tipo'=>  $this->randomPick(["1","2","3"]), // tipo,
                'regimen'=>  $this->randomPick(["1","2"]), // regimen,   

            ]);
        }
        
        return $list;
    }

  

    
} 

?>