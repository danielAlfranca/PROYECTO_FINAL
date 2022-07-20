<?php 

    /* 

    ESTRUCTURA TABLA
    
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    document VARCHAR(150),
    type TINYINT NOT NULL,
    data JSON
    
    */

    function build_agents($empresas, $trabajadores,$reservas){

       $agents = [[null,0]];
      
       for ($i=0; $i <$empresas ; $i++) {   $agents[]=[null,1]; }  
       for ($i=0; $i <$trabajadores ; $i++) {  $agents[]=[null,2]; }
       for ($i=0; $i <$reservas ; $i++) { $agents[]=[null,3];  }

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