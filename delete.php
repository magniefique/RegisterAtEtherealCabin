<?php
if(isset($_POST)){
    $userdata = file_get_contents("php://input");
    $userinfo = json_decode($userdata, true);
    
    $userid = $userinfo['id'];

    $conn = mysqli_connect('localhost', 'root', '', 'database');
    if(!$conn){
        die('Connection Failed : '.mysqli_connect_error());
    }
    else{
        echo "<h1>$userid</h1>";
        $query = mysqli_query($conn, "INSERT INTO `archived` SELECT * FROM `registration` WHERE id = $userid");
        $query = mysqli_query($conn, "DELETE FROM `registration` WHERE id = $userid;");
    }
    mysqli_close($con);
}