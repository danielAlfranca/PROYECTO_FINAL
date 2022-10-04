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

        'pasajeros'=>['private'=>6, 'validations'=>['pasajeros_valid'], 'required'=>true, 'default'=>'0.0.0'], // falta validacion

        'date_start'=>['private'=>7, 'validations'=>['date_valid'], 'required'=>true], // falta validacion

        'date_end'=>['private'=>8, 'validations'=>['date_valid', 'date_end_valid'], 'required'=>true], // falta validacion

        'time_start'=>['private'=>9, 'validations'=>['time_valid'], 'required'=>false], // falta validacion

        'time_end'=>['private'=>10, 'validations'=>['time_valid'], 'required'=>false], // falta validacion

        'proveedor'=>['private'=>11, 'validations'=>['is_number'], 'required'=>true],   // falta validacion     

        'user'=>['private'=>12, 'validations'=>['user_valid'], 'required'=>false] 

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

    public function validate($items){ // validada datos segun las validaciones especificadas en keys

        $reserva = $items['reserva'];
        $tours = $items['tours'];
        $hoteles = $items['hoteles'];

        $errors = parent::validate($items['reserva']);
    
        foreach ($tours as $tour) {
            
            $manager = new TourActivity();
            $errors =array_merge($errors,$manager->validate($tour));
        }

        foreach ($hoteles as $hotel) {
            
            $manager = new HotelActivity();
            $errors =array_merge($errors,$manager->validate($hotel));
        }      

        return $errors;
    }

    public function sanitize($items){ // sanitiza datos segun las validaciones especificadas en keys

        $reserva = $items['reserva'];
        $tours = $items['tours'];
        $hoteles = $items['hoteles'];

        $items['reserva'] = parent::sanitize($items['reserva']);

        $manager = new TourActivity();

        $items['tours'] = $manager->sanitize($items['tours']);

        $manager = new TourActivity();

        $items['hoteles'] = $manager->sanitize($items['hoteles']);

        return $items;
    }

    

    

}

