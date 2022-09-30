<?php 

class Trabajador extends Section{   

    public static $table = "trabajadores";
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'], 

        'nombre'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true], 

        'apellidos'=>['private'=>2, 'validations'=>['is_string'], 'required'=>true], 

        'documento'=>['private'=>3, 'validations'=>['is_string'], 'required'=>false], 
        
        'telefonos'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false], 

        'emails'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false],

        'tipo'=>['private'=>6, 'validations'=>['tipo_valid'], 'required'=>true], 

        'regimen'=>['private'=>7, 'validations'=>['regimen_valid'], 'required'=>true],

        'hidden'=>['private'=>8, 'validations'=>[], 'required'=>false, 'default'=>false]  
    ]; 


    public function delete($data){

        $updated = static::set_property($data, true, 'hidden');        
        return $this->update($updated);
     }

    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_validations();         
        $this->validations['tipo_valid']  = fn($data, $name) => in_array( static::get_property($data,$name), range(1,3));  
        $this->validations['regimen_valid']  = fn($data, $name) => in_array( static::get_property($data,$name), range(1,2));       
       
    }

    protected function init_sanitize_funcs(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_sanitize_funcs();  

        $this->sanitize_funcs['tipo_valid']  = fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);
        $this->sanitize_funcs['regimen_valid']  = fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);
    }






}