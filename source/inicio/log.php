<?php  
require_once "../../conexion/conect.php"; 

class log extends conect
{     
    public function __construct() 
    {
        parent::__construct(); 
    }
    public function get_access_login($user,$pass){
        $sql = $this->_db->prepare("SELECT * FROM adm_login
                                    WHERE usuario = :user and pass = :pass LIMIT 1");//nombre = :Nombre'
        $sql->execute(array('user' => $user,'pass'=>$pass));
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
}