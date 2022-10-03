<?php 

class Reserva extends Section{ 

    public static $table = "reservas";
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'],        

        'nombre'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true, 'default'=>''],

        'apellidos'=>['private'=>2, 'validations'=>['is_string'], 'required'=>true, 'default'=>''],

        'telefonos'=>['private'=>3, 'validations'=>['is_string'], 'required'=>false] ,

        'emails'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false],

        'destino'=>['private'=>5, 'validations'=>['is_string'], 'required'=>true, 'default'=>''],

        'pasajeros'=>['private'=>6, 'validations'=>['is_string'], 'required'=>true, 'default'=>'0.0.0'], // falta validacion

        'date_start'=>['private'=>7, 'validations'=>['is_string'], 'required'=>true, 'default'=>null], // falta validacion

        'date_end'=>['private'=>8, 'validations'=>['is_string'], 'required'=>true, 'default'=>null], // falta validacion

        'time_start'=>['private'=>9, 'validations'=>['is_string'], 'required'=>false, 'default'=>null], // falta validacion

        'time_end'=>['private'=>10, 'validations'=>['is_string'], 'required'=>false, 'default'=>null], // falta validacion

        'proveedor'=>['private'=>11, 'validations'=>[], 'required'=>true, 'default'=>null],   // falta validacion     

        'user'=>['private'=>12, 'validations'=>[], 'required'=>false, 'default'=>null] 

    ]; 


    public function dataSet($field, $value, $dates = false){
  
        $table = static::$table; 

        $queryString = "SELECT * FROM $table WHERE $field=:$field"; 

        if($dates!=false){

            if(array_key_exists('start',$dates)){

                $queryString .= " AND date_end >= '".$dates['start']."'"; 
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

}

