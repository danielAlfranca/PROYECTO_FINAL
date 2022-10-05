<?php 

class HotelActivity extends Section{   

    public static $table = "hotel_reserva";

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'],        

        'habitaciones'=>['private'=>1, 'validations'=>['habitaciones_valid'], 'required'=>true, 'default'=>''],

        'reserva'=>['private'=>2, 'validations'=>['is_number'], 'required'=>true],

        'hotel'=>['private'=>3, 'validations'=>['is_number'], 'required'=>true] ,

        'date_start'=>['private'=>4, 'validations'=>['date_valid'], 'required'=>true, 'default'=>null], // falta validacion

        'date_end'=>['private'=>5, 'validations'=>['date_end_valid'], 'required'=>true, 'default'=>null], // falta validacion

        'time_start'=>['private'=>6, 'validations'=>['time_valid'], 'required'=>false, 'default'=>null], // falta validacion

        'time_end'=>['private'=>7, 'validations'=>['time_valid'], 'required'=>false, 'default'=>null], // falta validacion

        'comments'=>['private'=>8, 'validations'=>['is_string'], 'required'=>false],   // falta validacion   
    ];
    
    
    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_validations(); 

        $this->validations['habitaciones_valid'] =  function($data, $name)  {            

            $arr = explode("-",strval(static::get_property($data,$name)));
            $correct = true;

            foreach ($arr as $value) {

                $rooms = explode(".",$value);

                if(count($rooms)!=2) return false;

                if(intval($rooms[0])<1 || intval($rooms[1])<1) return false;
            }

            return true;        
        };       
    }

    protected function init_sanitize_funcs(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_sanitize_funcs();  
        $this->sanitize_funcs['habitaciones_valid']  = fn($data, $name)=> filter_var(self::get_property($data,$name),FILTER_SANITIZE_STRING); 
       
    }


}