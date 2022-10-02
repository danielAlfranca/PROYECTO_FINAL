<?php 

include_once 'models/section.php';

class Empresa extends Section{   
    
    public static $table = "empresas";
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true , 'default'=>'nuevo'] , 

        'nombre'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true],  

        'documento'=>['private'=>2, 'validations'=>['is_string'], 'required'=>false], 

        'telefonos'=>['private'=>3, 'validations'=>['is_string'], 'required'=>false], 

        'emails'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false],

        'direccion'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false],

        'hidden'=>['private'=>6, 'validations'=>[], 'required'=>false, 'default'=>false],

        'user'=>['private'=>7, 'validations'=>[], 'required'=>false, 'default'=>null]    
    ]; 


    public function delete($data){

       $updated = static::set_property($data, true, 'hidden');
       
        return $this->update($updated);
    }
    


}