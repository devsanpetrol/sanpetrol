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
        $sql = $this->_db->prepare("SELECT adm_articulo.cod_articulo,adm_articulo.descripcion,adm_articulo.marca,adm_almacen.stock,adm_articulo.especificacion,adm_articulo.id_categoria,adm_articulo.tipo_unidad
                                    FROM adm_articulo
                                    INNER JOIN adm_almacen ON adm_articulo.cod_articulo = adm_almacen.cod_articulo
                                    INNER JOIN adm_categoria_consumibles ON adm_articulo.id_categoria = adm_categoria_consumibles.id_categoria
                                    WHERE adm_articulo.cod_articulo = :codigo or adm_articulo.cod_barra = :codigo");//nombre = :Nombre'
        $sql->execute(array('codigo' => $searchTerm));
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_now(){
        $sql = $this->_db->prepare("SELECT NOW() AS fecha_actual");
        $sql->execute();
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_categoria_articulo(){
        $sql = $this->_db->prepare("SELECT adm_categoria_consumibles.id_categoria,adm_categoria_consumibles.categoria,adm_categoria_consumibles.id_empleado_resp, adm_persona.nombre,adm_persona.apellidos
                                    FROM adm_categoria_consumibles
                                    INNER JOIN adm_empleado ON adm_categoria_consumibles.id_empleado_resp = adm_empleado.id_empleado
                                    INNER JOIN adm_persona ON adm_empleado.id_persona = adm_persona.id_persona");
        $sql->execute();
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function set_solicitud($fecha_solicitud,$status_solicitud,$id_formato,$clave_solicita){
        $sql1 = $this->_db->prepare("INSERT INTO adm_solicitud_material (fecha_solicitud,status_solicitud,id_formato,clave_solicita) VALUES ('$fecha_solicitud',$status_solicitud,$id_formato,$clave_solicita)");
        $sql2 = $this->_db->prepare("SELECT folio FROM adm_solicitud_material WHERE fecha_solicitud = '$fecha_solicitud' AND clave_solicita = $clave_solicita LIMIT 1");
        $sql1->execute();
        $sql2->execute();
        $resultado = $sql2->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function set_pedido($autorizado, $articulo, $cantidad, $unidad, $detalle_articulo, $justificacion, $anexo_codicion, $destino, $status_pedido, $comentario, $grado_requerimiento, $fecha_requerimiento, $cod_articulo, $id_categoria, $folio){
        $date = new DateTime($fecha_requerimiento);
        $fn = $date->format('Y-m-d');
        $sql = $this->_db->prepare("INSERT INTO adm_pedido (autoriza, articulo, cantidad, unidad, detalle_articulo, justificacion, anexo_codicion, destino, status_pedido, comentario, grado_requerimiento, fecha_requerimiento, cod_articulo, id_categoria, folio)
                                    VALUES ('$autorizado', '$articulo', $cantidad, '$unidad', '$detalle_articulo', '$justificacion', '$anexo_codicion', '$destino', $status_pedido, '$comentario', '$grado_requerimiento', '$fn', '$cod_articulo', $id_categoria, $folio)");
        $resultado = $sql->execute();
        return $resultado;
    }
    public function get_solicitudes(){
        $sql = $this->_db->prepare("SELECT adm_solicitud_material.folio, adm_solicitud_material.fecha_solicitud, adm_solicitud_material.clave_solicita,adm_persona.nombre,adm_persona.apellidos
                                    FROM adm_solicitud_material
                                    INNER JOIN adm_empleado ON adm_solicitud_material.clave_solicita = adm_empleado.id_empleado
                                    INNER JOIN adm_persona ON adm_empleado.id_persona = adm_persona.id_persona
                                    WHERE status_solicitud = 1");
        $sql->execute();
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_pedidos($folio){
        $sql = $this->_db->prepare("SELECT id_pedido,cantidad,unidad,articulo,destino,autorizado,status_pedido,comentario FROM adm_pedido WHERE folio = $folio");
        $sql->execute();
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function get_partida($id_pedido){
        $sql = $this->_db->prepare("SELECT
                                    adm_pedido.id_pedido,
                                    adm_pedido.autorizado,
                                    adm_pedido.articulo,
                                    adm_pedido.cantidad,
                                    adm_pedido.unidad,
                                    adm_pedido.detalle_articulo,
                                    adm_pedido.justificacion,
                                    adm_pedido.aprobacion,
                                    adm_pedido.anexo_codicion,
                                    adm_pedido.destino,
                                    adm_pedido.status_pedido,
                                    adm_pedido.comentario,
                                    adm_pedido.grado_requerimiento,
                                    adm_pedido.fecha_requerimiento,
                                    adm_pedido.cod_articulo,
                                    adm_pedido.id_categoria,
                                    adm_pedido.folio,
                                    adm_pedido.autoriza,
                                    adm_persona.nombre,adm_persona.apellidos,
                                    adm_solicitud_material.fecha_solicitud,
                                    adm_empleado.especialista,
                                    adm_categoria_consumibles.categoria
                                    FROM adm_pedido
                                    INNER JOIN adm_solicitud_material ON adm_pedido.folio = adm_solicitud_material.folio
                                    INNER JOIN adm_empleado ON adm_solicitud_material.clave_solicita = adm_empleado.id_empleado
                                    INNER JOIN adm_persona ON adm_empleado.id_persona = adm_persona.id_persona
                                    INNER JOIN adm_categoria_consumibles ON adm_pedido.id_categoria = adm_categoria_consumibles.id_categoria
                                    WHERE id_pedido = $id_pedido");
        $sql->execute();
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    public function set_comentario($id_pedido,$comentario){
        $sql1 = $this->_db->prepare("UPDATE adm_pedido SET adm_pedido.comentario = '$comentario' WHERE adm_pedido.id_pedido = $id_pedido LIMIT 1");
        $sql2 = $this->_db->prepare("SELECT adm_pedido.comentario FROM adm_pedido WHERE adm_pedido.id_pedido = $id_pedido LIMIT 1");
        $sql1->execute();
        $sql2->execute();
        $resultado = $sql2->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
}