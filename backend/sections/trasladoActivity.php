<?php 

class TrasladoActivity extends Activity{   
    

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true], 

        'activity_index'=>['private'=>1, 'validations'=>[], 'required'=>true],

        'activity_type'=>['private'=>2, 'validations'=>[], 'required'=>true, 'default' => 7 , 'fixed'=>true],

        'agent'=>['private'=>3, 'validations'=>[], 'required'=>true],

        'date_start'=>['private'=>4, 'validations'=>[], 'required'=>false],

        'date_end'=>['private'=>5, 'validations'=>[], 'required'=>false],

        'time_start'=>['private'=>6, 'validations'=>[], 'required'=>true],

        'time_end'=>['private'=>7, 'validations'=>[], 'required'=>true],

        'data'=>['private'=>8, 'validations'=>[], 'required'=>true,'default'=>[]],

        'origen'=>['private'=>'8.0', 'validations'=>[], 'required'=>true,'default'=>''],

        'destino'=>['private'=>'8.1', 'validations'=>[], 'required'=>true,'default'=>''],

        'operador'=>['private'=>'8.2', 'validations'=>[], 'required'=>true,'default'=>null]
    ]; 


}