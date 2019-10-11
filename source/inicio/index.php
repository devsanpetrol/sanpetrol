<?php
session_start();

if(!empty($_SESSION['id_usuario'])){
   header("location:source/index.php");
}else{
    header("location:login.php");
}