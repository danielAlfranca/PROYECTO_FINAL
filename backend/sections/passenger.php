<?php 

class Passenger {   
    


    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>[], 'required'=>true, 'default'=>null], 
        'activity'=>['private'=>1, 'validations'=>[], 'required'=>true,'default'=>null],
        'passengers'=>['private'=>2, 'validations'=>[], 'required'=>true,'default'=>[]],    
        'adultos'=>['private'=>'2.0', 'validations'=>[], 'required'=>true],   
        'ninos'=>['private'=>'2.1', 'validations'=>[], 'required'=>true],   
        'infantes'=>['private'=>'2.2', 'validations'=>[], 'required'=>true]      
    ]; 


}