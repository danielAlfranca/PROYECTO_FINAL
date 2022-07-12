<?php 

    /* 

    ESTRUCTURA TABLA
    
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    document VARCHAR(150),
    type TINYINT NOT NULL,
    data JSON
    
    */

    function build_agents($inventario){

       $agents = [];
       $empresas = array_filter($inventario, fn($e) => $e['item_type']==1);

       foreach($empresas as $value){

            $agents[] = [

                'id'=>$value['id'],
                'name'=>'empresa '.$value['id']. ' s.a.',
                'document'=>random_int(1111111, 9999999),
                'data'=>null
            ];
       }

       return $agents;        

    }

    function build_agents_SQL($arr){

        $numItems = count($arr);
        $i = 0;

        $str = "INSERT INTO agents (id, name, document, type, data) VALUES ";    
      
        foreach($arr as $value){

            $id=$value['id'];
            $name=$value['name'];
            $document=$value['document'];
            $data='NULL';

            $str.= "($id,'$name','$document',$data)";

            if(++$i !== $numItems) { $str.= ',' ; }
        }

        return $str.';';
    }



?>