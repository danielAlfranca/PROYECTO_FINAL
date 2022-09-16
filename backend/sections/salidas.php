<?php 

class Salida extends Section{   
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>[], 'required'=>true, 'default'=>'nuevo'], 

        'type'=>['private'=>1, 'validations'=>[], 'required'=>true, 'default'=>2, 'fixed'=>true],

        'date_start'=>['private'=>2, 'validations'=>['is_string'], 'required'=>true, 'default'=>''], // falta validacion

        'date_end'=>['private'=>3, 'validations'=>['is_string'], 'required'=>true, 'default'=>''], // falta validacion

        'time_start'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false, 'default'=>''], // falta validacion

        'time_end'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false, 'default'=>''], // falta validacion

        'data'=>['private'=>6, 'validations'=>[], 'required'=>true, 'default'=>[]],

        'tour_id'=>['private'=>"6.0", 'validations'=>['is_string'], 'required'=>true, 'default'=>null],

        'pax'=>['private'=>"6.1", 'validations'=>[], 'required'=>true, 'default'=>[0,0,0]], 
        
        'activities'=>['private'=>"6.2", 'validations'=>[], 'required'=>true, 'default'=>['4'=>[],'5'=>[],'6'=>[],'7'=>[]]], 

        'guiados'=>['private'=>"6.2.4", 'validations'=>[], 'required'=>true, 'default'=>[]], 

        'chofers'=>['private'=>"6.2.5", 'validations'=>[], 'required'=>true, 'default'=>[]], 

        'operadores'=>['private'=>"6.2.6", 'validations'=>[], 'required'=>true, 'default'=>[]], 

        'restaurantes'=>['private'=>"6.2.7", 'validations'=>[], 'required'=>true, 'default'=>[]]
        
    ]; 

    public function save($data){

        $id = static::get_property($data,'id');
       
        if($id!='nuevo') return $this->update($data);

        try{

            $this->connection->beginTransaction();

            $type = static::get_property($data,'type');
            $date_start = static::get_property($data,'date_start');
            $date_end = static::get_property($data,'date_end');
            $time_start = static::get_property($data,'time_start');
            $time_end = static::get_property($data,'time_end');
            $datajson = json_encode(static::get_property($data,'data'));
    
            $query = $this->connection->prepare("INSERT INTO activity_group (type, date_start, date_end, time_start, time_end, data) VALUES(:type, :date_start, :date_end, :time_start, :time_end, :data)");

            $query->bindValue(':type', $type);
            $query->bindValue(':date_start', $date_start);
            $query->bindValue(':date_end', $date_end);
            $query->bindValue(':time_start', $time_start);
            $query->bindValue(':time_end', $time_end);
            $query->bindValue(':data', $datajson);

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

    public function update($data){

        $query = $this->connection->prepare("UPDATE activity_group SET type=:type, date_start=:date_start, date_end=:date_end, time_start=:time_start, time_end=:time_end, data=:data WHERE id=:id");

        $id = static::get_property($data,'id');
        $type = static::get_property($data,'type');
        $date_start = static::get_property($data,'date_start');
        $date_end = static::get_property($data,'date_end');
        $time_start = static::get_property($data,'time_start');
        $time_end = static::get_property($data,'time_end');
        $datajson = json_encode(static::get_property($data,'data'));
        
        $query->bindValue(':id', $id);
        $query->bindValue(':type', $type);
        $query->bindValue(':date_start', $date_start);
        $query->bindValue(':date_end', $date_end);
        $query->bindValue(':time_start', $time_start);
        $query->bindValue(':time_end', $time_end);
        $query->bindValue(':data', $datajson);
     
        if($query->execute()){

            $item = $this->select(static::get_property($data,'id'));

            $datajson = json_decode(static::get_property($item,'data'));

            $item = static::set_property($item, $datajson,'data');           

            return $item;
        }

        return false;
    }

    public function select($data){

        $query = $this->connection->prepare("SELECT * FROM activity_group WHERE id=:id");

        $query->setFetchMode(PDO::FETCH_NUM);

        $query->bindValue(':id', $id);
        
        $query->execute();

        return $query->fetch();
    }

    public function delete($data){

        $query = $this->connection->prepare("DELETE FROM activity_group WHERE id=:id");
        $query->bindValue(':id', static::get_property($data,'id'));

        return $query->execute();
    }



}