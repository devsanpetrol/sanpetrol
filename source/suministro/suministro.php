<?php  
require_once "../../conexion/conect.php"; 

class suministro extends conect 
{     
    public function __construct() 
    { 
        parent::__construct(); 
    } 
    public function get_almacen_categoria()
    { 
        $sql = $this->_db->prepare('SELECT * FROM categoria_consumibles');//nombre = :Nombre'
        $sql->execute();//$sql->execute(array('Nombre' => $nombre)); pasar parametros
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    } 
}