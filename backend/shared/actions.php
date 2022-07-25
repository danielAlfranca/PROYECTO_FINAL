<?php 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Origin: *');

require '../sections/appData.php';
require '../sections/empresa.php';

//session_start();

/* $section = $_POST['section'];
$action = $_POST['action'];
$data = $_POST['data'];
 */

if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Request method must be POST!');
}

$query = json_decode(trim(file_get_contents('php://input')),true);

$section = $query['section'];
$action = $query['action'];
$data = $query['data'];


 if( true /* isset($_SESSION['usertapp']) && !empty($_SESSION['usertapp']) */ ){

    //$user = $_SESSION['usertapp']; 

    $controller = get_section($section);  
   
   if($controller->validate($data)){ 

        echo json_encode($controller->$action($data));

    } else{ return false; }  
} 


function get_section($name){

    $classSection = ucfirst($name);

    return new $classSection();
}


