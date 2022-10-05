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

    

}