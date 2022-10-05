<?php 

include_once './lists/emails.php';
include_once './lists/names.php';
include_once './lists/inventario.php';

class FakeDataGenerator {  

    
    public $lists ;  

    public $numberOfItems;

    public $section;

    public function __construct($sectionClass){

        global $nombres_empresas;
        global $nombres_hoteles;
        global $nombres_tours;
        global $nombres_destinos;
        global $names;
        global $last_names;
        global $emails;
        global $direcciones;

        $this->section = $sectionClass;
        $this->lists = [

            'EMPRESAS'=>$nombres_empresas,
    
            'HOTELES'=>$nombres_hoteles,
    
            'TOURS'=>$nombres_tours,
    
            'NOMBRES'=>$names,
    
            'APELLIDOS'=>$last_names,
    
            'EMAILS'=>$emails,
    
            'DIRECCIONES'=>$direcciones,

            'DESTINOS'=>$nombres_destinos
        ];
            
    } 

    public function build(){



    }

    public function insert($items){

        $instance = new $this->section();
        $inserted = [];        
  
        foreach ($items as $item) { $inserted[] = $instance->save($item); }

        return $inserted;
    }

    public function parse($data){ 

        $item =[];
        
        foreach($this->section::$indexes as $key=>$config){

            $value = array_key_exists($key,$data) ? $data[$key] : (array_key_exists('default',$config) ? $config['default']:null);
            $item = $this->section::set_property($item , $value, $key);
        }

        return $item;
    }

    public function randomPick($arr,$num = 1){ 
        
        $index = array_rand($arr, $num);
   
        if($num==1) return $arr[$index];

        return array_map(fn($e) => $arr[$e], $index);
    }
} 

?>