<?php

class Database {

    const HOST = "localhost";
    const DATABASE = "travelapp";
    const USER = "root";
    const PASSWORD = "";

    public function __constructor(){}

    public static function connect(){

        $host = self::HOST;
        $db = self::DATABASE;

        try{

            $data_source_name = "mysql:host=$host;dbname=$db";
      
            return new PDO($data_source_name, self::USER, self::PASSWORD);

        } catch (PDOException $e) {

            return $e;
        }
    }    
}