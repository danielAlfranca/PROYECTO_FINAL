<?php 

class Empresa extends Inventario{   
    
    public static $fixed_constants = ['type'=>1];// para valores fijos

    public static $model =['nuevo',null,1,[],false]; 

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'agent'=>['private'=>1, 'validations'=>['agent_valid'], 'required'=>true],  

        'type'=>['private'=>2, 'validations'=>['type_valid'], 'required'=>true],

        'data'=>['private'=>3, 'validations'=>[], 'required'=>true],

        'hidden'=>['private'=>4, 'validations'=>['is_boolean'], 'required'=>true], 

        'nombre'=>['private'=>'3.0', 'validations'=>['is_string'], 'required'=>true], 

        'documento'=>['private'=>'3.1', 'validations'=>['is_string'], 'required'=>false], 

        'telefonos'=>['private'=>'3.3', 'validations'=>['is_string_array'], 'required'=>false], 

        'emails'=>['private'=>'3.4', 'validations'=>['is_string_array'], 'required'=>false],

        'direccion'=>['private'=>'3.2', 'validations'=>['is_string'], 'required'=>false] 
    ]; 



}