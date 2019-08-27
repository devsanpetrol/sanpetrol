<?php

    require_once './suministro.php'; 
    
    $suministro = new suministro(); 
    $a_users = $suministro->get_almacen_categoria();
   
    echo '<pre>';
        var_dump($a_users);
    echo '</pre>';
    
    
    
