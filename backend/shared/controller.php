<?php 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Origin: *');

require './database.php';
require '../sections/general/init.php';
require '../sections/general/appData.php';
require '../sections/models/section.php';
require '../sections/models/inventario.php'; // necesario para empresa, trabajador, hotel, tour y paquete
require '../sections/empresa.php';
require '../sections/hotel.php';
require '../sections/tour.php';
require '../sections/trabajador.php';


if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Request method must be POST!');
}

//session_start();

$query = json_decode(trim(file_get_contents('php://input')),true);

$section = $query['section'];
$action = $query['action'];
$data = $query['data'];


 if( true /* isset($_SESSION['usertapp']) && !empty($_SESSION['usertapp']) */ ){

    //$user = $_SESSION['usertapp']; 

    $controller = get_section($section); 
    
    $sanitized = $controller->sanitize($data);
    $errors = $controller->validate($sanitized);
   
   if(  count($errors) == 0 ){ 

        echo json_encode($controller->$action($data)) ;

    } else{ echo json_encode(['errors'=>$errors]);  }  
} 


function get_section($name){

    $classSection = ucfirst($name);

    return new $classSection();
}


