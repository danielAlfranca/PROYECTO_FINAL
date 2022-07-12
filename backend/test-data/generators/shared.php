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

 
?>