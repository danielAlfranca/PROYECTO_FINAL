<?php 

class OperadorActivity extends Section{   
    
    public static $table = "operador_salida";   

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'salida'=>['private'=>1, 'validations'=>[], 'required'=>true],

        'proveedor'=>['private'=>2, 'validations'=>[], 'required'=>true],

        'comments'=>['private'=>3, 'validations'=>['is_string'], 'required'=>false]       
    ]; 

}