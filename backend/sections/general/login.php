<?php 


class Login{   
    
    private $connection;
    private static $userSession ='dfghsdfhg';
    public function __construct(){

        $this->connection = Database::connect();
    }


    public function log($data){ 
        
        if(static::isLogged()) return true;

        if($data['type']=='register') return $this.register($data);

        $_SESSION[static::$userSession] = $data['email'];     

        return true;       
    }  

    public function unlog(){

        session_destroy();

        return true; 

    }

    public function register($data){

        if($data['type']=='login') return $this.login($data);

        $email = $data['email'];
        $pass = $data['password'];

        $str = "INSERT INTO users (email, pass, user) VALUES ('$email', '$pass', '$email')";   

        $query = $this->connection->prepare($str);
        
        if($query->execute()){

            $lastID = $this->connection->lastInsertId();

            $query = $this->connection->prepare("SELECT * FROM users WHERE id='".$lastID."'");   

          
            if($query->execute()){

                $this->connection->commit();
                return true;

            }else return false;
            

        }else return false;
       
    }  

    
    public function validate($data){

        $errors = [];  
          

        if(!isset($data)) $errors[] = 'Error en usuario y contraseña';

        if(!is_array($data)) $errors[] = 'Error en usuario y contraseña';

        if(!isset($data['type'])) $errors[] = 'Peticion incorrecta';

        if($data['type']=='unlog') return $errors;

        if(!isset($data['email'])) $errors[] = 'Error en campo email';

        if(!isset($data['password'])) $errors[] = 'Error en campo contraseña';        

        $user = $this->get_user($data);
        $type = $data['type'];

        if(!static::isLogged()){

            if($type=='login'){

                if($user==false) {$errors[] = 'El usuario no existe';}
                else if(!$this->pass_ok($data, $user)) $errors[] = 'La contraseña es incorrecta';
            }

            if($type=='register'){ if($user!=false) $errors[] = 'El usuario ya existe'; }
        }

        return $errors;    
    }

    public function sanitize($data){

        return $data;
    }

    private function get_user($data){

        $email = $data['email'];

        try{            

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare("SELECT * FROM users WHERE email='".$email."'");            

          
            if($query->execute()){

                return $query->fetch();

            }else return false;

        }catch(PDOExecption $e) { return false; }
      
    }

    private function pass_ok($query, $dataDB){

        return trim($query["password"]) == trim($dataDB['pass']);
      
    }

    public static function isLogged(){
        
        return isset($_SESSION[static::$userSession]);
    }
    
}