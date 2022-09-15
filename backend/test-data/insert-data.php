<?php 

    //http://localhost/PROYECTO_FINAL/backend/test-data/insert-data.php


    include_once './lists/emails.php';
    include_once './lists/names.php';

    include_once './generators/shared.php';
    include_once './generators/inventory.php';
    include_once './generators/agents.php';
    include_once './generators/reservas.php';
    include_once './generators/salidas.php';

    include_once '../shared/database.php';    

    $empresas = 10;
    $trabajadores = 6;
    $reservas = 24;
    $reservasAgents = $reservas - 12;

    $agents = build_agents($empresas,$trabajadores,$reservasAgents);  
    $inventory = build_inventory($empresas,$trabajadores,$emails, $names,$last_names);
    $tours = array_filter($inventory, fn($e)=>$e[2]==4);
    $hotels = array_filter($inventory, fn($e)=>$e[2]==3);
    $reservas = build_reservas($reservas, [ $empresas , $trabajadores , $reservasAgents ], $names, $last_names, $emails, $tours, $hotels);
    $salidas = build_salidas($reservas,$empresas,$trabajadores);

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

        foreach ($reservas as $item) {
     
            $statement = $connection->prepare("INSERT INTO activity_group( type, date_start, date_end, data)  VALUES(:type, :date_start, :date_end, :data)");
            $statement->bindParam(":type", $item[1]);
            $statement->bindParam(":date_start", $item[2]);
            $statement->bindParam(":date_end", $item[3]);
            $statement->bindParam(":data", $item[6]);
          
            $statement->execute();            
        }

        foreach ($salidas as $item) {

            $statement = $connection->prepare("INSERT INTO activity_group( type, date_start, date_end, time_start, time_end, data)  VALUES(:type, :date_start, :date_end, :time_start, :time_end, :data)");
            $statement->bindParam(":type", $item[1]);
            $statement->bindParam(":date_start", $item[2]);
            $statement->bindParam(":date_end", $item[3]);
            $statement->bindParam(":time_start", $item[4]);
            $statement->bindParam(":time_end", $item[5]);
            $statement->bindParam(":data", $item[6]);
          
            $statement->execute();            
        }
      
        echo 'success ';

    }catch( PDOException $e) {   echo $e->getMessage();  } 

    
?>

