<?php 

    function randomPick($arr,$num){ 
        
        return $arr[array_rand($arr,$num)];    
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