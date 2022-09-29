<?php 

class Empresa extends Inventario{   
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true , 'default'=>'nuevo'] , 

        'nombre'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true],  

        'documento'=>['private'=>'3.1', 'validations'=>['is_string'], 'required'=>false], 

        'telefonos'=>['private'=>'3.3', 'validations'=>['is_string_array'], 'required'=>false], 

        'emails'=>['private'=>'3.4', 'validations'=>['is_string_array'], 'required'=>false],

        'direccion'=>['private'=>'3.2', 'validations'=>['is_string'], 'required'=>false] 
    ]; 



}