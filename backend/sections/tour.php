<?php 


class Tour extends Section{     

    public static $table = "tours";
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true, 'default'=>'nuevo'], 

        'nombre'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true], 

        'inicio'=>['private'=>2, 'validations'=>['is_string'], 'required'=>true], // !!! FALTA VALIDACION

        'fin'=>['private'=>3, 'validations'=>['is_string'], 'required'=>true], // !!! FALTA VALIDACION

        'duracion'=>['private'=>4, 'validations'=>['is_number'], 'required'=>true], 

        'destino'=>['private'=>5, 'validations'=>['is_string'], 'required'=>true],

        'hidden'=>['private'=>6, 'validations'=>['is_boolean'], 'required'=>false, 'default'=>false] ,
        
        'user'=>['private'=>7, 'validations'=>['user_valid'], 'required'=>false, 'default'=>null]  
    ]; 


    public function delete($data){

        $updated = static::set_property($data, true, 'hidden');
        
         return $this->update($updated);
     }
}