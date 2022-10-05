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

    public function save($items){ 
        
        $reserva = $items['reserva'];
        $tours = $items['tours'];
        $hoteles = $items['hoteles'];
       
        $id = static::get_property($reserva,'id');

        $newValues = ['item'=>null, 'extra_data'=>['tourActivity'=>[],'hotelActivity'=>[]]];
       
        if($id!='nuevo') return $this->update($items);

        try{

            $reserva = parent::save($items['reserva']);
            $id = static::get_property($reserva,'id');

            $newValues['item']=  $reserva;

            foreach ($tours as $tour) {
            
                $manager = new TourActivity();
                $parsed = $manager::set_property($tour, $id, 'reserva');
                $newValues['extra_data']['tourActivity'][]= $manager->save($parsed);
            }
    
            foreach ($hoteles as $hotel) {
                
                $manager = new HotelActivity();
                $parsed = $manager::set_property($hotel, $id, 'reserva');
                $newValues['extra_data']['hotelActivity'][]= $manager->save($parsed);
                             
            } 
            
            return $newValues;

        }catch(PDOException $e) { return $e; }
    }

    public function update($items){ 
        
        $reserva = $items['reserva'];
        $tours = $items['tours'];
        $hoteles = $items['hoteles'];
       
        $id = static::get_property($reserva,'id');        
       
        if($id=='nuevo') return $this->save($items);

        $newValues = ['item'=>null, 'extra_data'=>['tourActivity'=>[],'hotelActivity'=>[]]];

        try{

            $reserva = parent::update($items['reserva']);
            $newValues['item']=  $reserva;

            foreach ($tours as $tour) {
            
                $manager = new TourActivity();
                $parsed = $manager::set_property($tour, $id, 'reserva');
                $newValues['extra_data']['tourActivity'][]= $manager->save($parsed);
            }
    
            foreach ($hoteles as $hotel) {
                
                $manager = new HotelActivity();
                $parsed = $manager::set_property($hotel, $id, 'reserva');
                $newValues['extra_data']['hotelActivity'][]= $manager->save($parsed);                             
            } 
            
            return $newValues;

        }catch(PDOException $e) { return $e; }
    }

    public function delete($items){

        $reserva = $items['reserva'];
        $tours = $items['tours'];
        $hoteles = $items['hoteles'];

        try{

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare("DELETE FROM tour_reserva WHERE reserva=:id; ");

            $query->bindValue(':id', static::get_property($reserva,'id')); 

             $query->execute();
             $query->closeCursor();

            $query = $this->connection->prepare("DELETE FROM hotel_reserva WHERE reserva=:id;");

            $query->bindValue(':id', static::get_property($reserva,'id')); 

             $query->execute();
             $query->closeCursor();
            
             $query = $this->connection->prepare(" DELETE FROM reservas WHERE id=:id;");

             $query->bindValue(':id', static::get_property($reserva,'id')); 

             $query->execute();
             $query->closeCursor();
            
             $this->connection->commit();  
             
             return ['item'=>$reserva, 'extra_data'=>['tourActivity'=>$tours,'hotelActivity'=>$hoteles]];

        }catch(PDOException $e) { return false; }

        

    }


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
        
        $manager = new TourActivity();

        foreach ($tours as $tour) {
            
           
            $errors =array_merge($errors,$manager->validate($tour));
        }

        $manager = new HotelActivity();
        
        foreach ($hoteles as $hotel) {
            
           
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

        foreach ($items['tours'] as $key => $value) {

            $items['tours'][$key]= $manager->sanitize($value);
        }

        $manager = new HotelActivity();

        foreach ($items['hoteles'] as $key => $value) {

            $items['hoteles'][$key]= $manager->sanitize($value);
        }

        return $items;
    }

    

    

}

