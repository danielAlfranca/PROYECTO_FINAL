<?php 

require '../shared/database.php';

class AppData{   
    
 
    public function __constructor(){}
    
    public function dataSet(){

        $connection = Database::connect();
        $query = $connection->prepare("SELECT * FROM inventory_items");
        $query->setFetchMode(PDO::FETCH_NUM);
        $query->execute(); 

        return $query->fetchAll();
    }

    public function update($data){}

    public function select($data){}

    public function delete($data){}
    
    public function validate($data){ return true;}

}