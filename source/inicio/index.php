<?php
session_start();

if(empty($_SESSION['id_usuario'])){
   header("location:login.php");
}else{
    header("location:login.php");
}