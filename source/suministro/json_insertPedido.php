<?php
    require_once './suministro.php'; 
    $suministro = new suministro();
    $data = array();
    
    if(!empty($_POST['articulo'])){
        
        $autorizado = $_POST['autorizado'];
        $articulo = $_POST['articulo'];
        $cantidad = $_POST['cantidad'];
        $unidad = $_POST['unidad'];
        $detalle_articulo = $_POST['detalle_articulo'];
        $justificacion = $_POST['justificacion'];
        $anexo_codicion = $_POST['anexo_codicion'];
        $destino = $_POST['destino'];
        $status_pedido = $_POST['status_pedido'];
        $comentario = $_POST['comentario'];
        $grado_requerimiento = $_POST['grado_requerimiento'];
        $fecha_requerimiento = $_POST['fecha_requerimiento'];
        $cod_articulo = $_POST['cod_articulo'];
        $id_categoria = $_POST['id_categoria'];
        $folio = $_POST['folio'];
        
        $articulos  = $suministro->set_pedido($autorizado, $articulo, $cantidad, $unidad, $detalle_articulo, $justificacion, $anexo_codicion, $destino, $status_pedido, $comentario, $grado_requerimiento, $fecha_requerimiento, $cod_articulo, $id_categoria, $folio);
        if ($articulos == true){
            $data[] = array("result"=>'exito');
        }else{
            $data[] = array("result"=>'no guardo');
        }
    }else{
            $data[] = array("result"=>'falla');
    }
    
    header('Content-Type: application/json');
    echo json_encode($data);