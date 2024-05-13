<?php
if(isset($_POST)){
    $userdata = file_get_contents("php://input");
    $userinfo = json_decode($userdata, true);
    
    $username = $userinfo['username'];
}

$conn = mysqli_connect('localhost', 'root', '', 'database');
$query = mysqli_query($conn, "SELECT * FROM registration WHERE username='$username'");
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);
exit(json_encode($result));