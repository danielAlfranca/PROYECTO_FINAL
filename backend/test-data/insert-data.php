<?php 

    //http://localhost/PROYECTO_FINAL/backend/test-data/insert-data.php


    include_once '../shared/database.php';


    include_once './generators/empresas.php';
    include_once './generators/hoteles.php';
    include_once './generators/tours.php';
    include_once './generators/trabajadores.php';
    include_once './generators/reservas.php';
    include_once './generators/tourReserva.php';
    include_once './generators/hotelReserva.php';
    include_once './generators/salidas.php';
    include_once './generators/guiaSalidas.php';
    include_once './generators/choferSalidas.php';
    include_once './generators/operadorSalidas.php';
    include_once './generators/pasajerosSalidas.php';


    // EMPRESAS

    $generator = new EmpresasGenerator();
    $empresas = $generator->insert($generator->build());

    // HOTELES

    $generator = new HotelesGenerator($empresas);
    $hoteles = $generator->insert($generator->build());

    // TOURS

    $generator = new ToursGenerator();
    $tours = $generator->insert($generator->build());

    // TRABAJADORES

    $generator = new TrabajadoresGenerator();
    $trabajadores = $generator->insert($generator->build());

    // RESERVAS

    $generator = new ReservasGenerator($empresas);
    $reservas = $generator->insert($generator->build());

    // TOURS RESERVAS

    $generatorTourReservas = new TourReservasGenerator($reservas,$tours);
    $toursReservas = $generatorTourReservas->insert($generatorTourReservas->build());

     // HOTELES RESERVAS

     $generator = new HotelReservasGenerator($reservas,$hoteles);
     $generator->insert($generator->build());


     // SALIDAS

     $generator = new SalidasGenerator($toursReservas);
     $salidas = $generator->insert($generator->build());

      // GUIADOS SALIDAS

      $generator = new GuiadoSalidasGenerator($salidas,$trabajadores);
      $generator->insert($generator->build());

      // CHOFERS SALIDAS

      $generator = new ChoferSalidasGenerator($salidas,$trabajadores);
      $generator->insert($generator->build());

      // OPERADOR SALIDAS

      $generator = new OperadorSalidasGenerator($salidas,$empresas);
      $generator->insert($generator->build());


      // PASAJEROS SALIDAS

      $generator = new PasajerosSalidasGenerator($salidas,$empresas);
      $generator->insert($generator->build());


      // ASSIGNACION TOURS RESERVAS A SALIDAS

      $items = [];

      foreach ($toursReservas as $tour) {
        
        $date = TourReserva::get_property($tour,'date_start');
        $tour_id = TourReserva::get_property($tour,'tour');

        foreach ($salidas as $salida) {
            
            $start = Salida::get_property($salida,'date_start');

            if($start<=date("Y-m-d")){

                if($start==$date && Salida::get_property($salida,'tour')==$tour_id ){

                    $item = TourReserva::set_property($tour,Salida::get_property($salida,'id'),'salida');
                    $items[] = $item;
               }
            }           
        }
      }

      $generatorTourReservas->insert($items);     


    echo 'success '; 




    
?>

