<?php 

class Passenger {   
    


    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>null], 

        'activity'=>['private'=>1, 'validations'=>[], 'required'=>true,'default'=>null],

        'passengers'=>['private'=>2, 'validations'=>[], 'required'=>true,'default'=>[0,0,0]],    
        'adultos'=>['private'=>'2.0', 'validations'=>[], 'required'=>true,'default'=>0],   
        'ninos'=>['private'=>'2.1', 'validations'=>[], 'required'=>true,'default'=>0],   
        'infantes'=>['private'=>'2.2', 'validations'=>[], 'required'=>true,'default'=>0]      
    ]; 


}