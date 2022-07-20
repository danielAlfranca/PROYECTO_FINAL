<?php 

    //http://localhost/PROYECTO_FINAL/backend/test-data/insert-data.php


    include_once './lists/emails.php';
    include_once './lists/names.php';

    include_once './generators/shared.php';
    include_once './generators/inventory.php';
    include_once './generators/agents.php';

    include_once '../shared/database.php';    

    $empresas = 10;
    $trabajadores = 6;
    $reservas = 12;

    $agents = build_agents($empresas,$trabajadores,$reservas);  
    $inventory = build_inventory($empresas,$trabajadores,$emails, $names);

    $user='root';
    $host='localhost';
    $password='';
    $dbname = 'travelapp';

    $dsn = "mysql:host=localhost;dbname=$dbname";
    $connection =  new PDO($dsn, $user, $password);


    try{    
        foreach ($agents as $agent) {
     
            $statement = $connection->prepare("INSERT INTO agents (agent_type)  VALUES(:agent_type)");
            $statement->bindParam(":agent_type", $agent[1]);
            $statement->execute();            
        }

        foreach ($inventory as $item) {
     
            $statement = $connection->prepare("INSERT INTO inventory_items( agent, type, data, hidden)  VALUES(:agent, :type, :data, :hidden)");
            $statement->bindParam(":agent", $item[1]);
            $statement->bindParam(":type", $item[2]);
            $statement->bindParam(":data", $item[3]);
            $statement->bindParam(":hidden", $item[4]);
            $statement->execute();            
        }
      
        echo 'success ';

    }catch( PDOException $e) {   echo $e->getMessage();  } 

    
?>

