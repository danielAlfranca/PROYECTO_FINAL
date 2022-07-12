<?php 


    //http://localhost/PROYECTO_FINAL/backend/test-data/insert-data.php


    include_once './lists/emails.php';
    include_once './lists/names.php';

    include_once './generators/shared.php';
    include_once './generators/inventory.php';
    include_once './generators/agents.php';

    $inventory = build_inventory();
    $agents = build_agents($inventory);

    $user='root';
    $host='localhost';
    $password='';
    $dbName = 'travelapp';

    $conection = mysqli_connect($host, $user, $password); 

    if (!$conection) {

        die('Hubo un error en la conexion a la base de datos: ' . mysqli_error());

    }else{

        $sql = "USE $dbName;";
        $sql .= build_agents_SQL($agents);  

 
      if ($conection->multi_query($sql)===TRUE) { // no funciona
          
            echo "agents creados";

            $conection->next_result();

        } else { echo "Error en la creacion agents: " . $conection->error; } 

    }    

?>

