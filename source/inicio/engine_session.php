<?php
session_start();
include_once './log.php';
$log = new log();

$user = $_POST['user'];
$pass = $_POST['password'];

$chk_session = $log->get_access_login($user, $pass);

if(count($chk_session)== 1){
    $_SESSION['userid'] = $user;
}
header('location: index.php');