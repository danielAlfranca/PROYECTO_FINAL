<?php 

    function randomPick($arr,$num = 1){ 
        
        $index = array_rand($arr, $num);
   
        if($num==1) return $arr[$index];

        return array_map(fn($e) => $arr[$e], $index);
    }

    function builListNames($name,$num){ 

        $arr = [];

        for ($i=1; $i <=$num; $i++){  $arr[]= $name.' '.$i; }

        return $arr;
    }

    function buildIdLisT($init, $end){ 

        $arr = [];

        for ($i=$init; $i <$end; $i++){  $arr[]= $i; }

        return $arr;
    }

    function randomAddress($direccion,$destinos,$paises){

        return randomPick($direccion). ", ".randomPick($destinos).", ".randomPick($paises);
    }

    function buildItem($data, $type){ // para generar fake data

        $item =[];
        
        foreach(type::$indexes as $key=>$config){

            $value = $data[$key] ? $data[$key] : ($config['default'] ? $config['default']:null);
            type::set_property($item , $value, $key);
        }

        return $item;
    }

 
?>