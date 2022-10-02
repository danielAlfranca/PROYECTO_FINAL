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


    protected function save_extra_data($item, $extra_data){
     
        $result = [];
        $managers = ['tours'=>TourReserva::class, 'hoteles'=>HotelReserva::class]; 
        $reservaID = static::get_value($item, 'id') ;     
            
        foreach ($managers as $key => $managerClass) {

            if(array_key_exists($key,$extra_data)){

                $result[$key]=[];
                $manager = new $managerClass();

                foreach ($extra_data[$key] as $value) {

                    try{
                        
                        $item = $managerClass::set_property($value,'reserva',$reservaID);
                        $activity = $manager->save($item);                        
                        if($activity)  $result[$key][] = $activity;  
                        else return false;                             
            
                    }catch(PDOExecption $e) { return false; }                                    
                }    
            }
        }       
        
        return $result;
    }

}

