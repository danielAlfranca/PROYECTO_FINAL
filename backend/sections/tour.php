<?php 

class Tour extends Inventario{   
    
    public static $fixed_constants = ['type'=>4, 'agent'=>1];// para valores fijos

    public static $model = ['nuevo',1,4,[],false];
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'], 

        'agent'=>['private'=>1, 'validations'=>['agent_valid'], 'required'=>true, 'default'=>1, 'fixed'=>true],  

        'type'=>['private'=>2, 'validations'=>['type_valid'], 'required'=>true, 'default'=>4, 'fixed'=>true],

        'data'=>['private'=>3, 'validations'=>[], 'required'=>true, 'default'=>[]],

        'hidden'=>['private'=>4, 'validations'=>['is_boolean'], 'required'=>true, 'default'=>false], 

        'nombre'=>['private'=>'3.0', 'validations'=>['is_string'], 'required'=>true], 

        'inicio'=>['private'=>'3.1', 'validations'=>['is_string'], 'required'=>true], // !!! FALTA VALIDACION

        'fin'=>['private'=>'3.2', 'validations'=>['is_string'], 'required'=>true], // !!! FALTA VALIDACION

        'duracion'=>['private'=>'3.3', 'validations'=>['is_number'], 'required'=>true], 

        'destino'=>['private'=>'3.4', 'validations'=>['is_string'], 'required'=>true]
    ]; 

}