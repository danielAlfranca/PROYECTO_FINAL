<?php 

class HotelReserva extends Section{   

    public static $table = "hotel_reserva";

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'],        

        'habitaciones'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true, 'default'=>''],

        'reserva'=>['private'=>2, 'validations'=>[], 'required'=>true],

        'hotel'=>['private'=>3, 'validations'=>[], 'required'=>true] ,

        'date_start'=>['private'=>4, 'validations'=>['is_string'], 'required'=>true, 'default'=>null], // falta validacion

        'date_end'=>['private'=>5, 'validations'=>['is_string'], 'required'=>true, 'default'=>null], // falta validacion

        'time_start'=>['private'=>6, 'validations'=>['is_string'], 'required'=>false, 'default'=>null], // falta validacion

        'time_end'=>['private'=>7, 'validations'=>['is_string'], 'required'=>false, 'default'=>null], // falta validacion

        'comments'=>['private'=>8, 'validations'=>[], 'required'=>false],   // falta validacion   
    ]; 


}