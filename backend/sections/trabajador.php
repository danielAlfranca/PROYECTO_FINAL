<?php 

class Trabajador extends Inventario{   

    
    public static $fixed_constants = ['type'=>2];// para valores fijos

    public static $model =  ['nuevo',1,2,[],false];
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'agent'=>['private'=>1, 'validations'=>['agent_valid'], 'required'=>true],  

        'type'=>['private'=>2, 'validations'=>['type_valid'], 'required'=>true],

        'data'=>['private'=>3, 'validations'=>[], 'required'=>true],

        'hidden'=>['private'=>4, 'validations'=>['is_boolean'], 'required'=>true], 

        'nombre'=>['private'=>'3.0', 'validations'=>['is_string'], 'required'=>true], 

        'documento'=>['private'=>'3.1', 'validations'=>['is_string'], 'required'=>false], 

        'tipo'=>['private'=>'3.4', 'validations'=>['tipo_valid'], 'required'=>true], 

        'regimen'=>['private'=>'3.5', 'validations'=>['regimen_valid'], 'required'=>true], 

        'telefonos'=>['private'=>'3.2', 'validations'=>['is_string_array'], 'required'=>false], 

        'emails'=>['private'=>'3.3', 'validations'=>['is_string_array'], 'required'=>false],
   
    ]; 

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