<?php  
require_once "../../conexion/conect.php"; 

class suministro extends conect 
{     
    public function __construct() 
    {
        parent::__construct(); 
    }
    public function get_almacen_categoria(){
        $sql = $this->_db->prepare('SELECT adm_articulo.cod_articulo,adm_articulo.descripcion,adm_categoria_consumibles.categoria,adm_articulo.marca,adm_almacen.stock_min,adm_almacen.stock_max,adm_almacen.stock
                                    FROM adm_articulo
                                    INNER JOIN adm_almacen ON adm_articulo.cod_articulo = adm_almacen.cod_articulo
                                    INNER JOIN adm_categoria_consumibles ON adm_articulo.id_categoria = adm_categoria_consumibles.id_categoria');//nombre = :Nombre'
        $sql->execute();//$sql->execute(array('Nombre' => $nombre)); pasar parametros
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_form_sol_mat($numformat){
        $sql = $this->_db->prepare("SELECT * FROM adm_formato WHERE num_formato = '$numformat' ORDER BY num_revision DESC LIMIT 1");//nombre = :Nombre'
        $sql->execute();//$sql->execute(array('Nombre' => $nombre)); pasar parametros
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_almacen_busqueda($searchTerm){
        $sql = $this->_db->prepare("SELECT adm_articulo.cod_articulo,adm_articulo.descripcion,adm_articulo.marca,adm_almacen.stock
                                    FROM adm_articulo
                                    INNER JOIN adm_almacen ON adm_articulo.cod_articulo = adm_almacen.cod_articulo
                                    INNER JOIN adm_categoria_consumibles ON adm_articulo.id_categoria = adm_categoria_consumibles.id_categoria
                                    WHERE adm_articulo.descripcion LIKE '%$searchTerm%'");//nombre = :Nombre'
        $sql->execute();//$sql->execute(array('Nombre' => $nombre)); pasar parametros
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_almacen_busqueda_5(){
        $sql = $this->_db->prepare("SELECT adm_articulo.cod_articulo,adm_articulo.descripcion,adm_articulo.marca,adm_almacen.stock
                                    FROM adm_articulo
                                    INNER JOIN adm_almacen ON adm_articulo.cod_articulo = adm_almacen.cod_articulo
                                    INNER JOIN adm_categoria_consumibles ON adm_articulo.id_categoria = adm_categoria_consumibles.id_categoria
                                    LIMIT 0");//nombre = :Nombre'
        $sql->execute();//$sql->execute(array('Nombre' => $nombre)); pasar parametros
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_almacen_busqueda_1($searchTerm){
        $sql = $this->_db->prepare("SELECT adm_articulo.cod_articulo,adm_articulo.descripcion,adm_articulo.marca,adm_almacen.stock,adm_articulo.especificacion
                                    FROM adm_articulo
                                    INNER JOIN adm_almacen ON adm_articulo.cod_articulo = adm_almacen.cod_articulo
                                    INNER JOIN adm_categoria_consumibles ON adm_articulo.id_categoria = adm_categoria_consumibles.id_categoria
                                    WHERE adm_articulo.cod_articulo = :codigo or adm_articulo.cod_barra = :codigo");//nombre = :Nombre'
        $sql->execute(array('codigo' => $searchTerm));// pasar parametros
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
}