<?php 

class Salida extends Section{   

    public static $table = "salidas";

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>[], 'required'=>true, 'default'=>'nuevo'], // falta validacion

        'tour'=>['private'=>1, 'validations'=>['is_number'], 'required'=>true],

        'date_start'=>['private'=>2, 'validations'=>['date_valid'], 'required'=>true ], // falta validacion

        'date_end'=>['private'=>3, 'validations'=>['date_end_valid'], 'required'=>true], // falta validacion

        'time_start'=>['private'=>4, 'validations'=>['time_valid'], 'required'=>false], // falta validacion

        'time_end'=>['private'=>5, 'validations'=>['time_valid'], 'required'=>false], // falta validacion

        'comments'=>['private'=>6, 'validations'=>['is_string'], 'required'=>false] ,   
        
        'user'=>['private'=>7, 'validations'=>['user_valid'], 'required'=>false] , // falta validacion
        
    ]; 

    public function save($items){ 
        
        $salida = $items['salida']; 
       
        $id = static::get_property($salida,'id');
       
        if($id!='nuevo') return $this->update($items);

        try{

            $newValues = [];
            $newValues['item']=  parent::save($items['salida']);
                     
            return $newValues;

        }catch(PDOException $e) { return false; }
    }

    public function update($items){ 
        
        $salida = $items['salida']; 
       
        $id = static::get_property($salida,'id');
       
        if($id=='nuevo') return $this->save($items);  

        try{

            $newValues = [];
            $newValues['item']=  parent::update($items['salida']);           
            
            return $newValues;

        }catch(PDOException $e) { return $e; }
    }

    public function delete($items){

        $salida = $items['salida'];
        $operadores = $items['operadores'];
        $guias = $items['guias'];
        $chofers = $items['chofers'];
        $clientes = $items['clientes'];
        $noClientes = $items['no_clientes'];

        $updated = [];

        $salidaID = static::get_property($salida,'id');

        try{

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare("DELETE FROM operador_salida WHERE salida=:id; ");

            $query->bindValue(':id',  $salidaID); 

             $query->execute();
             $query->closeCursor();

            $query = $this->connection->prepare("DELETE FROM chofer_salida WHERE salida=:id;");

            $query->bindValue(':id', $salidaID); 

             $query->execute();
             $query->closeCursor();
            
             $query = $this->connection->prepare(" DELETE FROM guia_salida WHERE salida=:id;");

             $query->bindValue(':id',  $salidaID); 

             $query->execute();
             $query->closeCursor();

             $query = $this->connection->prepare(" DELETE FROM pasajeros_salida WHERE salida=:id;");

             $query->bindValue(':id',  $salidaID); 

             $query->execute();
             $query->closeCursor();

             
            foreach ($clientes as $cliente) {
            
                $manager = new TourActivity();
                $parsed = $manager::set_property($cliente, NULL, 'salida');
                $updated[]= $manager->save($parsed);
            }

             $query = $this->connection->prepare("DELETE FROM salidas WHERE id=:id; ");

            $query->bindValue(':id',  $salidaID); 

            $query->execute();
            $query->closeCursor();
            
             $this->connection->commit();  
             
             return ['item'=>$salida, 'extra_data'=>['operadorActivity'=>$operadores,'guiadoActivity'=>$guias, 'choferActivity'=>$chofers,'passenger'=>$noClientes],'update'=>['tourActivity'=>$updated]];

        }catch(PDOException $e) { return false; }        

    }

    public function dataSet($field, $value, $dates = false){
  
        $table = static::$table; 

        $queryString = "SELECT * FROM $table WHERE $field=:$field"; 

        if($dates!=false){

            if(array_key_exists('start',$dates)){

                $queryString .= " AND date_start >= '".$dates['start']."'";
            }

            if(array_key_exists('end',$dates)){

                $queryString .= " AND date_end <= '".$dates['end']."'" ;
            }             
            
            $query = $this->connection->prepare($queryString);
            $query->setFetchMode(PDO::FETCH_NUM);
            $query->bindValue(":$field", $value);
    
            if($query->execute()) return $query->fetchAll();
           
        }              

        return false;
    }

    public function validate($items){ // validada datos segun las validaciones especificadas en keys

        $salida = $items['salida'];       

        $errors = parent::validate($items['salida']);
        
        return $errors;
    }

    public function sanitize($items){ // sanitiza datos segun las validaciones especificadas en keys

        $salida = $items['salida']; 
    
        $items['salida'] = parent::sanitize($items['salida']);

        return $items;
    }


    

}