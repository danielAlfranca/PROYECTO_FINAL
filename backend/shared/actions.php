<?php 

session_start();

$section = $_POST['section'];
$action = $_POST['action'];
$data = $_POST['data'];


if(isset($_SESSION['usertapp']) && !empty($_SESSION['usertapp']) ){

    $user = $_SESSION['usertapp'];

    $controller = get_section($section, $user);
   
    if($controller->validate($data)){ 

        return $controller->$action($data);

    } else{ return false ; }
}


function get_section($name,$user){

    $classSection = new ucfirst($name);

    return new $classSection($user) ;
}


