<?php 

    //http://localhost/PROYECTO_FINAL/backend/test-data/insert-data.php


    include_once './lists/emails.php';
    include_once './lists/names.php';
    include_once './lists/inventario.php';

    include_once './generators/shared.php';
    include_once './generators/inventory.php';
    include_once './generators/agents.php';
    include_once './generators/reservas.php';
    include_once './generators/salidas.php';

    include_once '../shared/database.php';    

    $num_empresas = count($nombres_empresas);
    $num_guias = 7;
    $num_choferes = 6;
    $num_administrativos = 5;
    $num_hoteles = count($nombres_hoteles);
    $num_tours = count($nombres_tours);
    $reservas = 24;
    $reservasAgents = $reservas - 12;

    //$agents = build_agents($empresas,$trabajadores,$reservasAgents);  
    /* $inventory = build_inventory($empresas,$trabajadores,$emails, $names,$last_names);
    $tours = array_filter($inventory, fn($e)=>$e[2]==4);
    $hotels = array_filter($inventory, fn($e)=>$e[2]==3);
    $reservas = build_reservas($reservas, [ $empresas , $trabajadores , $reservasAgents ], $names, $last_names, $emails, $tours, $hotels);
    $salidasYReservas = build_salidas($reservas,$empresas,$trabajadores);
    $salidas = $salidasYReservas["salidas"];
    $reservas = $salidasYReservas["reservas"]; */

    $empresasItems = build_empresas($num_empresas, $nombres_empresas,$emails, $direcciones);
    $hotelesItems = build_hoteles($num_hoteles, $nombres_hoteles,$emails, $direcciones, $empresasItems);
    $trabajadoresItems = build_trabajadores($num_guias, $num_choferes, $num_administrativos, $names,$last_names, $emails, $direcciones);
    $toursItems = build_tours($num_tours, $nombres_tours,$nombres_destinos);

    $user='root';
    $host='localhost';
    $password='';
    $dbname = 'travelapp';

    $dsn = "mysql:host=localhost;dbname=$dbname";
    $connection =  new PDO($dsn, $user, $password);


    try{    
       /*  foreach ($agents as $agent) {
     
            $statement = $connection->prepare("INSERT INTO agents (agent_type)  VALUES(:agent_type)");
            $statement->bindParam(":agent_type", $agent[1]);
            $statement->execute();            
        }
 */

        foreach ($empresasItems as $item) {
            
            $statement = $connection->prepare("INSERT INTO empresas( nombre, documento, telefonos, emails, direccion)  VALUES(:nombre, :documento, :telefonos, :emails, :direccion)");
            $statement->bindParam(":nombre", $item[1]);
            $statement->bindParam(":documento", $item[2]);
            $statement->bindParam(":telefonos", $item[3]);
            $statement->bindParam(":emails", $item[4]);
            $statement->bindParam(":direccion", $item[5]);
            $statement->execute();            
        }
        foreach ($hotelesItems as $item) {
            
            $statement = $connection->prepare("INSERT INTO hoteles( nombre, tipo, telefonos, emails, direccion, propietario)  VALUES(:nombre, :tipo, :telefonos, :emails, :direccion, :propietario)");
            $statement->bindParam(":nombre", $item[1]);
            $statement->bindParam(":tipo", $item[2]);
            $statement->bindParam(":telefonos", $item[3]);
            $statement->bindParam(":emails", $item[4]);
            $statement->bindParam(":direccion", $item[5]);
            $statement->bindParam(":propietario", $item[6]);
            $statement->execute();            
        }

        foreach ($trabajadoresItems as $item) {
            
            $statement = $connection->prepare("INSERT INTO trabajadores( nombre, apellidos, documento,  telefonos, emails, tipo, regimen)  VALUES(:nombre, :apellidos, :documento,  :telefonos, :emails, :tipo, :regimen)");
            $statement->bindParam(":nombre", $item[1]);
            $statement->bindParam(":apellidos", $item[2]);
            $statement->bindParam(":documento", $item[3]);
            $statement->bindParam(":telefonos", $item[4]);
            $statement->bindParam(":emails", $item[5]);
              $statement->bindParam(":tipo", $item[6]);
            $statement->bindParam(":regimen", $item[7]);
 
            $statement->execute();            
        }

        foreach ($toursItems as $item) {
            
            $statement = $connection->prepare("INSERT INTO tours( nombre, inicio, fin,  duracion, destino)  VALUES(:nombre, :inicio, :fin,  :duracion, :destino)");
            $statement->bindParam(":nombre", $item[1]);
            $statement->bindParam(":inicio", $item[2]);
            $statement->bindParam(":fin", $item[3]);
            $statement->bindParam(":duracion", $item[4]);
            $statement->bindParam(":destino", $item[5]);
   
            $statement->execute();            
        }

/*         foreach ($inventory as $item) {
     
            $statement = $connection->prepare("INSERT INTO empresas( agent, type, data, hidden)  VALUES(:agent, :type, :data, :hidden)");
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
        } */
      
        echo 'success ';

    }catch( PDOException $e) {   echo $e->getMessage();  } 

    
?>

