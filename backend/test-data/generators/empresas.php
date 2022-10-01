<?php 

include_once './generator.php';
include_once '../sections/empresa.php';

class EmpresasGenerator extends FakeDataGenerator {  

    
    public function __construct(){
        
        parent::__construct(Empresa::class);

        $this->numberOfItems = count($this->lists['EMPRESAS']);
    }


    public function build(){

        $list = [];

        for ($i=0; $i < $this->numberOfItems; $i++) { 
            
            $list[]= $this->parse([

                'id'=>  "nuevo", // id
                'nombre'=>  $this->lists['EMPRESAS'][$i].$this->randomPick([" S.L.", " S.A."," corp.",  " S.A.C"]),
                'documento'=>  strval(rand(111111,999999)),// doc
                'telefonos'=>  strval(rand(600000000,699999999)), // phones 
                'emails'=>  $this->randomPick($this->lists['EMAILS']), // emails
                'direccion'=>  $this->randomPick($this->lists['DIRECCIONES']) // address

            ]);
        }
        
        return $list;
    }

  

    
} 

?>