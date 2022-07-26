<?php

class AppConfig{    


    public function __construct(){}
    
    public function initData($data){

        return [

            'empresa'=>[
                'indexes'=>Empresa::$indexes,
                'model'=>Empresa::$model
            ],
            'hotel'=>[
                'indexes'=>Hotel::$indexes,
                'model'=>Hotel::$model
            ], 
             'tour'=>[
                'indexes'=>Tour::$indexes,
                'model'=>Tour::$model
            ], 
            'trabajador'=>[
                'indexes'=>Trabajador::$indexes,
                'model'=>Trabajador::$model
            ] 
        ];
    } 
    
    public function validate($data){
        
        return true;    
    }

    public function sanitize($data){

        return $data;
    }

}