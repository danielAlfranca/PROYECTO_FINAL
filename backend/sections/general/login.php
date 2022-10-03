<?php 


class Login{   
    
    private $connection;
    private $userSession ='dfghsdfhg';
    private $passwordSession ='dfghsdfhg';

    public function __construct(){

        session_start();
        $this->connection = Database::connect();
    }


    public function log($data){

        if(!$this->sessionExists()){

            if($data['type']=='register') return $this.register($data);

            $_SESSION[$this->userSession] = $data['email']; 
            $_SESSION[$this->userSession] = $data['password']; 
        }       

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

            $query = $this->connection->prepare("SELECT * FROM 'users' WHERE id='".$lastID."'");   

          
            if($query->execute()){

                return $query->fetch();

            }else return false;
            

        }else return false;
       
    }  

    
    public function validate($data){

        $errors = [];

        if(!$this->sessionExists()){

            if(!isset($data)) $errors[] = 'Error en usuario y contraseña';

            if(!is_array($data)) $errors[] = 'Error en usuario y contraseña';

            if(!array_key_exists('email',$data)) $errors[] = 'Error en campo email';

            if(!array_key_exists('password',$data)) $errors[] = 'Error en campo contraseña';

            if(!array_key_exists('type',$data)) $errors[] = 'Peticion incorrecta';

            $user = $this->get_user($data);
            $type = $data['type'];

            if($type=='login'){

                if($user==false) $errors[] = 'El usuario no existe';
                if(!$this->pass_ok()) $errors[] = 'La contraseña es incorrecta';
            }

            if($type=='register'){

                if($user!=false) $errors[] = 'El usuario ya existe';
            }
        }        

        return $errors;    
    }

    public function sanitize($data){

        return $data;
    }

    private get_user($data){

        $email = $data['email'];

        try{            

            if(!$this->connection->inTransaction()) $this->connection->beginTransaction();

            $query = $this->connection->prepare("SELECT * FROM 'users' WHERE email='".$email."'");            

          
            if($query->execute()){

                return $query->fetch();

            }else return false;

        }catch(PDOExecption $e) { return false; }
      
    }

    private pass_ok($query, $dataDB){

        return trim($query["password"]) == trim($dataDB['pass']);
      
    }

    private function sessionExists(){

        return array_key_exists($_SESSION[$this->userSession],$_SESSION);

    }
    
}