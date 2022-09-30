<?php 


class Hotel extends Section{   
    
    public static $table = "hoteles";

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'], 

        'nombre'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true], 

        'tipo'=>['private'=>2, 'validations'=>['tipo_valid'], 'required'=>true],

        'categoria'=>['private'=>3, 'validations'=>['categoria_valid'], 'required'=>false],   

        'telefonos'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false, 'default'=>[]], 

        'emails'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false, 'default'=>[]],
         
        'direccion'=>['private'=>6, 'validations'=>['is_string'], 'required'=>false, 'default'=>''],       

        'propietario'=>['private'=>7, 'validations'=>[], 'required'=>false, 'default'=>NULL], // falta

        'hidden'=>['private'=>8, 'validations'=>[], 'required'=>false, 'default'=>false]  
    ]; 


    public function delete($data){

        $updated = static::set_property($data, true, 'hidden');
        
         return $this->update($updated);
     }
   
 
    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_validations();         
        $this->validations['tipo_valid']  = fn($data, $name) => in_array( static::get_property($data,$name), range(1,3));        
        $this->validations['categoria_valid']  = function($data, $name) { 
            
            $value = static::get_property($data,$name);
            $is_hotel = static::get_property($data,'tipo') == 1;

            return $is_hotel ? in_array( $value, range(1,5)):true;
        };
    }

    protected function init_sanitize_funcs(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_sanitize_funcs();  

        $this->sanitize_funcs['tipo_valid']  =fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);

        $this->sanitize_funcs['categoria_valid']  = fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);
    }

}