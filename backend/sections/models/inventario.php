

<?php 


class Inventario extends Section{

    protected function newAgent($data){

        $type = static::$fixed_constants['type'];
        $id = static::get_property($data,'id');
        $agent = static::get_property($data,'agent');

        if($type!=1 && $type!=2 ) return static::$fixed_constants['agent']; // SI NO ES NI EMPRESA NI TRABAJADOR NO TIENE AGENTE Y SE LE ASIGNA LA ID 1 QUE ES SIN AGENTE

        if($id!=='nuevo') return $agent; // SI NO ES NUEVO NO SE LE PUEDE ASIGNAR UN AGENTE NUEVO

        $query = $this->connection->prepare("INSERT INTO agents (agent_type) VALUES($type)");
        $query->execute();

        return $this->connection->lastInsertId();
    }

    public function update($data){

        $query = $this->connection->prepare("UPDATE inventory_items SET agent=:agent, type=:item_type, data=:data WHERE id=:id");

        $id = static::get_property($data,'id');
        $agent = static::get_property($data,'agent');
        $type = static::get_property($data,'type');
        $datajson = json_encode(static::get_property($data,'data'));
        // $hidden = json_encode($this->get_property($data,'hidden'));  !!! No se actualiza . Solo se hace por delete llegado el caso
  
        $query->bindValue(':agent', $agent);
        $query->bindValue(':item_type', $type);
        $query->bindValue(':data', $datajson);
        $query->bindValue(':id', $id);
     
        if($query->execute()){

            $item = $this->select(static::get_property($data,'id'));

            $datajson = json_decode(static::get_property($item,'data'));

            $item = static::set_property($item, $datajson,'data');           

            return $item;
        }

        return false;
    }

    public function select($id){

        $query = $this->connection->prepare("SELECT * FROM inventory_items WHERE id=:id");

        $query->setFetchMode(PDO::FETCH_NUM);

        $query->bindValue(':id', $id);
        
        $query->execute();

        return $query->fetch();
    }


    public function save($data){

        $id = static::get_property($data,'id');
       
        if($id!='nuevo') return $this->update($data);

        try{

            $this->connection->beginTransaction();

            $type = static::get_property($data,'type');

            $agent = $this->newAgent($data);   
            $type = static::get_property($data,'type');
            $datajson = json_encode(static::get_property($data,'data'));
            $hidden = false; 
    
            $query = $this->connection->prepare("INSERT INTO inventory_items (agent, type, data, hidden) VALUES(:agent, :type, :data, :hidden)");

            $query->bindValue(':agent', $agent);
            $query->bindValue(':type', $type);
            $query->bindValue(':data', $datajson);
            $query->bindValue(':hidden', $hidden);

            if($query->execute()){

                $lastID = $this->connection->lastInsertId();
    
                $item  = $this->select( $lastID );

                $datajson = json_decode(static::get_property($item,'data'));

                $item = static::set_property($item, $datajson,'data');   

                $this->connection->commit();
        
                return $item;

            }else return false;

        }catch(PDOExecption $e) { return false; }
       
    }

    public function delete($data){

        $query = $this->connection->prepare("UPDATE inventory_items SET hidden=TRUE WHERE id=:id");
        $query->bindValue(':id', static::get_property($data,'id'));

        return $query->execute();
    }
    
    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_validations();         
        $this->validations['type_valid']  = fn($data, $name) => in_array( static::get_property($data,$name), range(1,5));
    }



   

   
}