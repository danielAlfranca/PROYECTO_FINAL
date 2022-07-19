

<?php 

require_once 'model.php';

class Inventario extends Section{

    public function select($data){

        $this->connection->prepare("SELECT * FROM inventory_items WHERE id=:id");

        $this->connection->setFetchMode(PDO::FETCH_NUM);

        $this->connection->bindValue(':id', $data);
        
        $this->connection->execute();

        return $this->connection->fetch();
    }

    public function delete($data){

        $this->connection->prepare("UPDATE inventory_items SET hidden=TRUE WHERE id=:id");

        $this->connection->bindValue(':id', $data);
        
        return $this->connection->execute();
    }

    public function update($data){

        $this->connection->prepare("UPDATE inventory_items SET agent=:agent, item_type=:item_type, data=:data_json, WHERE id=:id");

        $this->connection->bindValue(':agent', $data['agent']);
        $this->connection->bindValue(':item_type', $data['item_type']);
        $this->connection->bindValue(':data_json', $data['data']);
        $this->connection->bindValue(':id', $data['id']);

        if($this->connection->execute()){

            return $this->select($data['id']);
        }

        return false;
    }


    public function save($data){

        $this->connection->prepare("INSERT INTO inventory_items (agent, item_type, data) VALUES(:agent, :item_type, :data_json)");

        $this->connection->bindValue(':agent', $data['agent']);
        $this->connection->bindValue(':item_type', $data['item_type']);
        $this->connection->bindValue(':data_json', $data['data']);

        if($this->connection->execute()){

            $lastID = $this->connection->lastInsertId();
            return $this->select($lastID);
        }

        return false;
    }


   
}