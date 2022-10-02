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

                'indexes'=>TourReserva::$indexes
            ] ,
            'hotelActivity'=>[

                'indexes'=>HotelReserva::$indexes
            ] ,
            'operadorActivity'=>[

                'indexes'=>OperadorSalida::$indexes,

            ],
            'guiadoActivity'=>[

                'indexes'=>GuiadoSalida::$indexes,

            ],
            'choferActivity'=>[

                'indexes'=>ChoferSalida::$indexes,

            ],
            'passenger'=>[

                'indexes'=>PasajeroSalida::$indexes,

            ]

        ];

        foreach ($indexes as $key => $arr) {
            
            $parsed[$key] = array_filter($arr, fn ($k) => $k!='user', ARRAY_FILTER_USE_KEY);
        }

        return $parsed;

        return [

/*             'reserva'=>[

                'indexes'=>Reserva::$indexes
            ],
            'tourActivity'=>[

                'indexes'=>TourActivity::$indexes,

            ],
            'hotelActivity'=>[

                'indexes'=>HotelActivity::$indexes,
            ],
            'salida'=>[

                'indexes'=>Salida::$indexes,

            ],
         'operadorActivity'=>[

                'indexes'=>OperadorActivity::$indexes,

            ],
            'guiadoActivity'=>[

                'indexes'=>GuiadoActivity::$indexes,

            ],
            'choferActivity'=>[

                'indexes'=>ChoferActivity::$indexes,

            ],
            'restaurantActivity'=>[

                'indexes'=>RestaurantActivity::$indexes,

            ],
            'passenger'=>[

                'indexes'=>Passenger::$indexes
            ], */
           
        ];
    } 
    
    public function validate($data){
        
        return [];    
    }

    public function sanitize($data){

        return $data;
    }

}