<?php
session_start();

if(empty($_SESSION['id_usuario'])){
   header("location:../inicio/login.php");
}