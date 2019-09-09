<?php
require_once './suministro.php';
$suministro = new suministro();
$searchTerm = $_POST['searchTerm'];

if(!empty($_POST['searchTerm'])){
    $dato = $suministro->get_almacen_busqueda_1($searchTerm);
    $datos = array(
        'cod_articulo' => $dato[0]['cod_articulo'],
        'descripcion' => $dato[0]['descripcion'],
        'especificacion' => $dato[0]['especificacion']
    );
}else{
    $datos = array(
        'cod_articulo' => '',
        'descripcion' => '',
        'especificacion' => ''
    );
}
header('Content-Type: application/json');
echo json_encode($datos, JSON_FORCE_OBJECT);