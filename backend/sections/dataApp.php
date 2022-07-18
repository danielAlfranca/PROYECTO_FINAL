<?php 

class DataApp{   
    
    private $connection;
 
    public function __constructor(){

        $user='root';
        $host='localhost';
        $password='';
        $dbname = 'travelapp';    
        $dsn = "mysql:host=localhost;dbname=$dbname";

       // $this->connection =  new PDO($dsn, $user, $password);
        
    }
    
    public function dataSet(){

        return 'funciona'
    }

    public function update($data){}

    public function select($data){}

    public function delete($data){}
    
    public function validate($data){ return true}

}