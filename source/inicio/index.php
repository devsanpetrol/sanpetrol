<?php
session_start();

if(!empty($_SESSION['userid'])){
    echo 'Session iniciada';
    echo '<a href="logout.php">Logout</a>';
}else{
    header("location:login.php");
}