<?php

class AppConfig{    


    public function __construct(){}
    
    public function initData($data){

        $parsed = [];

        $indexes = [

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
               
            ] ,
            'reserva'=>[

                'indexes'=>Reserva::$indexes
            ] ,
            'salida'=>[

                'indexes'=>Salida::$indexes,

            ],
            'tourActivity'=>[

                'indexes'=>TourActivity::$indexes
            ] ,
            'hotelActivity'=>[

                'indexes'=>HotelActivity::$indexes
            ] ,
            'operadorActivity'=>[

                'indexes'=>OperadorActivity::$indexes,

            ],
            'guiadoActivity'=>[

                'indexes'=>GuiadoActivity::$indexes,

            ],
            'choferActivity'=>[

                'indexes'=>ChoferActivity::$indexes,

            ],
            'passenger'=>[

                'indexes'=>Passenger::$indexes,

            ]

        ];

        foreach ($indexes as $key => $arr) {
            
            $parsed[$key] = array_filter($arr, fn ($k) => $k!='user', ARRAY_FILTER_USE_KEY);
        }

        return $parsed;

   
    } 
    
    public function validate($data){
        
        return [];    
    }

    public function sanitize($data){

        return $data;
    }

}