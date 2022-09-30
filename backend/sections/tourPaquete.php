<?php 

class TourPaquete extends Section{   
    
    public static $table = "empresas";
    
    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['id_valid'], 'required'=>true , 'default'=>'nuevo'] , 

        'pasajeros'=>['private'=>1, 'validations'=>['is_string'], 'required'=>true],  

        'paquete'=>['private'=>2, 'validations'=>['is_string'], 'required'=>false], 

        'telefonos'=>['private'=>3, 'validations'=>['is_string'], 'required'=>false], 

        'emails'=>['private'=>4, 'validations'=>['is_string'], 'required'=>false],

        'direccion'=>['private'=>5, 'validations'=>['is_string'], 'required'=>false],

        'hidden'=>['private'=>6, 'validations'=>[], 'required'=>false, 'default'=>false]  
    ]; 




    public function delete($data){

       $updated = static::set_property($data, true, 'hidden');
       
        return $this->update($updated);
    }
    


}