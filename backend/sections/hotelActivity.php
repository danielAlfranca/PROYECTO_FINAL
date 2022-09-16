<?php 

class HotelActivity extends Activity{   
    
   /*  public static $fixed_constants = ['activity_type'=>1];// para valores fijos

    public static $model =[null,null,1, null, null, null,null, null, [null, [0,0,0]]];  */

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'activity_index'=>['private'=>1, 'validations'=>[], 'required'=>true],

        'activity_type'=>['private'=>2, 'validations'=>[], 'required'=>true, 'default' => 2 , 'fixed'=>true],

        'agent'=>['private'=>3, 'validations'=>[], 'required'=>true],

        'date_start'=>['private'=>4, 'validations'=>[], 'required'=>false],

        'date_end'=>['private'=>5, 'validations'=>[], 'required'=>false],

        'time_start'=>['private'=>6, 'validations'=>[], 'required'=>true],

        'time_end'=>['private'=>7, 'validations'=>[], 'required'=>true],

        'data'=>['private'=>8, 'validations'=>[], 'required'=>true,'default'=>[]],

        'hotel_id'=>['private'=>"8.0", 'validations'=>[], 'required'=>true], // falta

        'rooms'=>['private'=>"8.1", 'validations'=>['is_string_array'], 'required'=>true]
    ]; 


}