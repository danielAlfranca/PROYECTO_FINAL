<?php 

require '../shared/database.php';

class section{   
    
    private $connection;
 
    public function __constructor(){

        $this->connection = new Database();
    }

    public function save($data){}

    public function update($data){}

    public function select($data){}

    public function delete($data){}
    
    public function validate($data){}

}