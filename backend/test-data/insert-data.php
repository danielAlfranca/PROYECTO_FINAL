<?php 

    //http://localhost/PROYECTO_FINAL/backend/test-data/insert-data.php


    include_once '../shared/database.php';
    include_once '../sections/empresa.php'; 

    include_once './generators/empresas.php';
    include_once './generators/hoteles.php';
    include_once './generators/tours.php';
    include_once './generators/trabajadores.php';

    // empresas

    $generator = new EmpresasGenerator();
    $empresas = $generator->insert($generator->build());

    // hoteles

    $generator = new HotelesGenerator($empresas);
    $generator->insert($generator->build());

    // TOURS

    $generator = new ToursGenerator();
    $generator->insert($generator->build());

    // TRABAJADORES

    $generator = new TrabajadoresGenerator();
    $generator->insert($generator->build());


    echo 'success '; 




    
?>

