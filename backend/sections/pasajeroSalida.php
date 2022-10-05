<?php 

class Passenger extends Section{   
    
    public static $table = "pasajeros_salida";   

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'salida'=>['private'=>1, 'validations'=>[], 'required'=>true],

        'pasajeros'=>['private'=>2, 'validations'=>[], 'required'=>true],

        'nombre'=>['private'=>3, 'validations'=>['is_string'], 'required'=>true, 'default'=>''],

        'apellidos'=>['private'=>4, 'validations'=>['is_string'], 'required'=>true, 'default'=>''],

        'telefonos'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false] ,

        'emails'=>['private'=>6, 'validations'=>['is_string'], 'required'=>false],
        
        'proveedor'=>['private'=>7, 'validations'=>[], 'required'=>true, 'default'=>null],
    ]; 

    

}

