<?php 

require '../shared/database.php';

class section{   
    
    private $connection;
 
    public function __constructor($user){

        $this->connection = new Database($user);
    }

    public static function get_badge($start, $end){}

    public function save($data){}

    public function update($data){}

    public function select($data){}

    public function delete($data){}
    
    public function validate($data){}

}