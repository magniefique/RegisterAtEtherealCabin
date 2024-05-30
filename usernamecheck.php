<?php
if(isset($_POST)){
    $userdata = file_get_contents("php://input");
    $userinfo = json_decode($userdata, true);
    
    $username = $userinfo['username'];

    $conn = mysqli_connect('localhost', 'root', '', 'database');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }
    else{
        $query = mysqli_query($conn, "SELECT username FROM registration WHERE username='$username'");
        $result = mysqli_fetch_all($query, MYSQLI_ASSOC);
        exit(json_encode($result));
    }
}