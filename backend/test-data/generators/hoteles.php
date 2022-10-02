<?php 

include_once './generator.php';
include_once '../sections/hotel.php';
include_once '../sections/empresa.php';

class HotelesGenerator extends FakeDataGenerator {  

    private $empresas;
    public function __construct($empresas){
        
        parent::__construct(Hotel::class);

        $this->numberOfItems = count($this->lists['HOTELES']);
  
        $this->empresas = $empresas;
    }


    public function build(){

        $list = [];

        for ($i=0; $i < $this->numberOfItems; $i++) { 
            
            $tipo = $this->randomPick(["1","2","3"]);
            $list[]= $this->parse([

                'id'=>  "nuevo", // id 0
                'nombre'=> $this->lists['HOTELES'][$i], // nombre 1
                'tipo'=> $tipo, // tipo 2
                'telefonos'=> strval(rand(600000000,699999999)), // phones  3
                'emails'=> $this->randomPick($this->lists['EMAILS']), // emails 4
                'direccion'=> $this->randomPick($this->lists['DIRECCIONES']), // address 5
                'propietario'=> Empresa::get_property($this->randomPick($this->empresas ), 'id'), // propietario 6
                'categoria'=> $tipo == 1 ? $this->randomPick(["1",'2','3','4','5']):null, // categoria 7
                'user'=>1  //  
            ]);
        }
        
        return $list;
    }    
} 

?>