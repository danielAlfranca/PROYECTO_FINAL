<?php 

class Salida extends Section{   

    public static $table = "salidas";

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>[], 'required'=>true, 'default'=>'nuevo'], // falta validacion

        'tour'=>['private'=>1, 'validations'=>[], 'required'=>true],

        'date_start'=>['private'=>2, 'validations'=>['is_string'], 'required'=>true ], // falta validacion

        'date_end'=>['private'=>3, 'validations'=>['is_string'], 'required'=>true], // falta validacion

        'time_start'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false], // falta validacion

        'time_end'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false], // falta validacion

        'comments'=>['private'=>6, 'validations'=>['is_string'], 'required'=>false] ,   
        
        'user'=>['private'=>7, 'validations'=>[''], 'required'=>false] , // falta validacion
        
    ]; 

    

}