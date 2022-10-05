<?php 

class TourActivity extends Section{  
    
    public static $table = "tour_reserva";
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'],        

        'pasajeros'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true, 'default'=>'0.0.0'],

        'reserva'=>['private'=>2, 'validations'=>['is_number'], 'required'=>true],

        'tour'=>['private'=>3, 'validations'=>['is_number'], 'required'=>true] ,

        'date_start'=>['private'=>4, 'validations'=>['date_valid'], 'required'=>true], 

        'date_end'=>['private'=>5, 'validations'=>['date_end_valid'], 'required'=>true],

        'time_start'=>['private'=>6, 'validations'=>['time_valid'], 'required'=>false], 

        'time_end'=>['private'=>7, 'validations'=>['time_valid'], 'required'=>false],

        'salida'=>['private'=>8, 'validations'=>['is_number','nullable'], 'required'=>false],    

        'pasajeros_salida'=>['private'=>9, 'validations'=>['pasajeros_valid'], 'required'=>false],   
        
        'comments_salida'=>['private'=>10, 'validations'=>['is_string'], 'required'=>false] 
    ]; 


    protected function init_sanitize_funcs(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_sanitize_funcs();  
        $this->sanitize_funcs['is_number']  = function($data, $name){ 
            
            if($name=='salida'){ // NECESARIO PARA EVITAR QUE TRANSFORME NULL EN CASO DE HABERLO

                $value = self::get_property($data,$name);

                if($value==NULL || $value=='') return NULL;

                return filter_var(self::get_property($data,$name),FILTER_SANITIZE_NUMBER_INT);

            } else return filter_var(self::get_property($data,$name),FILTER_SANITIZE_NUMBER_INT);            
        
        }; 
       
    }

}