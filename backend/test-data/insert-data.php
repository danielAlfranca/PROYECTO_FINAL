<?php 

    include_once './lists/emails.php';
    include_once './lists/names.php';

    include_once './generators/shared.php';
    include_once './generators/inventory.php';

    $inventory = build_inventory();

    echo var_dump($inventory);

?>

