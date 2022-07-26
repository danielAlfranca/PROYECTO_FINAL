<?php 

class Hotel extends Inventario{   
    
    public static $fixed_constants = ['type'=>3, 'agent'=>1];// para valores fijos

    public static $model = ['nuevo',1,3,[],false];
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'agent'=>['private'=>1, 'validations'=>['agent_valid'], 'required'=>true],  

        'type'=>['private'=>2, 'validations'=>['type_valid'], 'required'=>true],

        'data'=>['private'=>3, 'validations'=>[], 'required'=>true],

        'hidden'=>['private'=>4, 'validations'=>['is_boolean'], 'required'=>true], 

        'nombre'=>['private'=>'3.0', 'validations'=>['is_string'], 'required'=>true], 

        'tipo'=>['private'=>'3.1', 'validations'=>['tipo_valid'], 'required'=>true], 

        'propietario'=>['private'=>'3.5', 'validations'=>['is_string'], 'required'=>false], // FALTA VALIDACION

        'categoria'=>['private'=>'3.2', 'validations'=>['categoria_valid'], 'required'=>false], 

        'telefonos'=>['private'=>'3.6', 'validations'=>['is_string_array'], 'required'=>false], 

        'emails'=>['private'=>'3.7', 'validations'=>['is_string_array'], 'required'=>false],
         
        'direccion'=>['private'=>'3.4', 'validations'=>['is_string'], 'required'=>false], 
    ]; 

   
 
    protected function init_validations(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_validations();         
        $this->validations['tipo_valid']  = fn($data, $name) => in_array( static::get_property($data,$name), range(1,5));        
        $this->validations['categoria_valid']  = function($data, $name) { 
            
            $value = static::get_property($data,$name);
            $is_hotel = static::get_property($data,'tipo') == 1;

            return $is_hotel && in_array( $value, range(1,5));
        };
    }

    protected function init_sanitize_funcs(){ // php no permite asignarlo directamente en la propiedad 

        parent::init_sanitize_funcs();  

        $this->sanitize_funcs['tipo_valid']  =fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);

        $this->sanitize_funcs['categoria_valid']  = fn($data, $name)=>filter_var(self::get_property($data,$name),FILTER_VALIDATE_INT);
    }





}