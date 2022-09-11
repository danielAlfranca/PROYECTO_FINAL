<?php

class AppConfig{    


    public function __construct(){}
    
    public function initData($data){

        return [

            'reserva'=>[
                'indexes'=>Reserva::$indexes,

            ],
            'tourActivity'=>[
                'indexes'=>TourActivity::$indexes,

            ],
            'hotelActivity'=>[
                'indexes'=>HotelActivity::$indexes,
            ],
            'empresa'=>[
                'indexes'=>Empresa::$indexes,
              
            ],
            'hotel'=>[
                'indexes'=>Hotel::$indexes,
            
            ], 
             'tour'=>[
                'indexes'=>Tour::$indexes,
               
            ], 
            'trabajador'=>[
                'indexes'=>Trabajador::$indexes,
               
            ] 
        ];
    } 
    
    public function validate($data){
        
        return [];    
    }

    public function sanitize($data){

        return $data;
    }

}