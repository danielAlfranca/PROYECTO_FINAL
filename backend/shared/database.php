<?php


class Database {

    const HOST = 'localhost';
    const DATABASE = 'travelapp';
    const PASSWORD = '';

    public $connection = null;
    private $user;

    public function __constructor($user){

        $this->user = $user;
        $this->_connect();
    }

    public function insert($data, $table){

        $columns = implode( ' , ' , tables::$table);

        $this->connection->prepare("INSERT INTO $table ( $columns )");
    }

    public function update($table, $data){

        $this->connection->prepare("INSERT INTO TABLE");
    }

    public function delete($table, $id){

        $this->connection->prepare("DELETE  ");
    }

    public function select($query){

        $this->connection->prepare("INSERT INTO ");
    }

    public function get_item($id){

        $this->connection->prepare("INSERT INTO ");
    }


    private function _connect(){

        try{

            $data_source_name = "mysql:self::HOST=localhost;dbname=self::DATABASE";
            $user = $this->user;

            $this->connection = new PDO($data_source_name, $user, self::PASSWORD);

            $this->setAttribute(PDO::ATTRR_ERRMODE, PDO::ERRMODE_EXCEPTION); // para que te avise del error y no solo lo registre en el log

        } catch (PDOException $e) {

            echo $e->getMessage();
        }
    }

    
}