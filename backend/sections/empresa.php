<?php 

require_once '../shared/database.php';

class Empresa {   
    
    public $connection;
 
    public function __constructor(){

        //$this->connection = Database::connect();
    }

    public function update($data){

        $connection = Database::connect();
        $query = $connection->prepare("UPDATE inventory_items SET agent=:agent, type=:item_type, data=:data, hidden=:hidden WHERE id=:id");

        $query->bindValue(':agent', $data[1]);
        $query->bindValue(':item_type', 1);
        $query->bindValue(':data', json_encode($data[3]));
        $query->bindValue(':id', $data[0]);
        $query->bindValue(':hidden', $data[4]);

        if($query->execute()){

            $item = $this->select($data[0]);
            $item[3] = json_decode($item[3]);

            return $item;
        }

        return false;
    }

    public function select($data){

        $this->connection = Database::connect();

        $query = $this->connection->prepare("SELECT * FROM inventory_items WHERE id=:id");

        $query->setFetchMode(PDO::FETCH_NUM);

        $query->bindValue(':id', $data);
        
        $query->execute();

        return $query->fetch();
    }


    public function save($data){

        $id = $data[0];

        if($id!='nuevo') return $this->update($data);

        try{

            $this->$connection->beginTransaction();
            $agentId = $this->newAgent();
            $json = json_encode($data[3]);
    
            $query = $this->connection->prepare("INSERT INTO inventory_items (agent, type, data, hidden) VALUES($agentId, 1, $json, false)");
            $query->execute();
    
            $lastID = $this->connection->lastInsertId();
    
            $item  = $this.select($lastID);
    
            $this->$connection->commit();
    
            return $item;

        }catch(PDOExecption $e) { return false; }
       
    }



    public function delete($data){

        $query = $this->connection->prepare("UPDATE inventory_items SET hidden=TRUE  , WHERE id=:id");
        $query->bindValue(':id', $data[0]);

        return $query->execute();
    }
    
    public function validate($data){ return true; }

    private function newAgent(){

        $query = $this->connection->prepare("INSERT INTO agents (agent_type) VALUES(1)");
        $query->execute();

        return $this->$connection->lastInsertId();
    }



}