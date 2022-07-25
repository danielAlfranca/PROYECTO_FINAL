<?php 

class Hotel extends Inventario{   
    
    public static $fixed_constants = ['type'=>3, 'agent'=>1];// para valores fijos

    public static $indexes = [

        'id'=>['private'=>0, 'validations'=>['index_valid'], 'required'=>true], 

        'agent'=>['private'=>1, 'validations'=>['agent_valid'], 'required'=>true],  

        'type'=>['private'=>2, 'validations'=>['type_valid'], 'required'=>true],

        'data'=>['private'=>3, 'validations'=>[], 'required'=>true],

        'hidden'=>['private'=>4, 'validations'=>['is_boolean'], 'required'=>true], 

        'nombre'=>['private'=>'3.0', 'validations'=>['is_string'], 'required'=>true], 

        'tipo'=>['private'=>'3.1', 'validations'=>['tipo_valid'], 'required'=>true], 

        'categoria'=>['private'=>'3.2', 'validations'=>['categoria_valid'], 'required'=>true], 

        'telefonos'=>['private'=>'3.6', 'validations'=>['is_string_array'], 'required'=>true], 

        'emails'=>['private'=>'3.7', 'validations'=>['is_string_array'], 'required'=>true],
         
        'direccion'=>['private'=>'3.4', 'validations'=>['is_string'], 'required'=>true], 
    ]; 

   
    public function validate($data){ 

        $id = self::get_property($data,'id');
        $exists = $this->select($id);

        if(($id!='nuevo' && !$exists)) return false;

        $agent = self::get_property($data,'agent');
        $exists = $this->select($agent);  

        if( $id!='nuevo' && !$exists ) return false;

        $tipo = self::get_property($data,'tipo');
        $categoria = self::get_property($data,'categoria');
        
        if($tipo!=1 &&$tipo!=2&&$tipo!=3) return false;
        if($tipo==1&&$categoria!=1 &&$categoria!=2&&$categoria!=3&&$categoria!=4&&$categoria!=5) return false;        

        if(!is_string(self::get_property($data,'nombre'))) return false;
        if(!is_string(self::get_property($data,'documento'))) return false;
        if(!is_string(self::get_property($data,'direccion'))) return false; 
      
        $telefonos = self::get_property($data,'telefonos');
        $emails = self::get_property($data,'emails');

        if(!is_array($telefonos) ) return false;
        if(!is_array($emails) ) return false;

       foreach ($telefonos as $value) { if(!is_string($value)) return false;}

        foreach ($emails as $value) { if(!is_string($value)) return false; }

        return true;

    }

    public function sanitize($data){

        $emails = array_map(fn($email)=>filter_var($email,FILTER_SANITIZE_EMAIL),self::get_property($data,'emails'));
        $emails = array_map(fn($email)=>filter_var($email,FILTER_SANITIZE_STRING),$emails);
        $phones = array_map(fn($phone)=>strval($phone), self::get_property($data,'telefonos'));
        $phones = array_map(fn($phone)=>filter_var($phone,FILTER_SANITIZE_STRING), $phones);
        $nombre = filter_var(self::get_property($data,'nombre'),FILTER_SANITIZE_STRING);
        $direccion = filter_var(strval(self::get_property($data,'direccion')),FILTER_SANITIZE_STRING);
        $documento = filter_var(strval(self::get_property($data,'documento')),FILTER_SANITIZE_STRING);

        $sanitized = $data;
        $sanitized = self::set_property($sanitized,$emails,'emails');
        $sanitized = self::set_property($sanitized,$phones,'telefonos');
        $sanitized = self::set_property($sanitized,$nombre,'nombre');
        $sanitized = self::set_property($sanitized,$direccion,'direccion');
        $sanitized = self::set_property($sanitized,$documento,'documento');    

       return $sanitized;        

    }





}