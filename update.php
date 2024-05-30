<?php
if(isset($_POST)){
    $userdata = file_get_contents("php://input");
    $userinfo = json_decode($userdata, true);
    
    $userid = $userinfo['id'];
    
    $username =$userinfo['username'];
    $pass = $userinfo['pass'];
    $lname = $userinfo['lname'];
    $fname = $userinfo['fname'];

    if(empty($userinfo['mname'])){
        $mname = " ";
    }
    else {
        $mname = $userinfo['mname'];
    }

    $bdate = $userinfo['bdate'];
    $useremail = $userinfo['useremail'];
    $cnum = $userinfo['cnum'];
    $gender = $userinfo['gender'];
    $empstatus = $userinfo['empstatus'];
    $disability = $userinfo['disability'];

    if(empty($userinfo['additional'])){
        $additional = " ";
    }
    else {
        $additional = $userinfo['additional'];
    }

    $address1 = $userinfo['address1'];

    if(empty($userinfo['address2'])){
        $address2 = " ";
    }
    else {
        $address2 = $userinfo['address2'];
    }

    $country = $userinfo['country'];
    $region = $userinfo['region'];
    $prov = $userinfo['prov'];
    $city = $userinfo['city'];
    $brgy = $userinfo['brgy'];
    $pcode = $userinfo['pcode'];
    $membertyper = $userinfo['membertyper'];
    $memberdur = $userinfo['memberdur'];

    if(empty($userinfo['ref'])){
        $ref = " ";
    }
    else {
        $ref = $userinfo['ref'];
    }

    if(empty($userinfo['memberfile'])){
        $memberfile = " ";
    }
    else {
        $memberfile = $userinfo['memberfile'];
    }

    $verif1 = $userinfo['verif1'];
    $verif2 = $userinfo['verif2'];

    $conn = mysqli_connect('localhost', 'root', '', 'database');
    if(!$conn){
        die('Connection Failed : '.mysqli_connect_error());
    }
    else{
        $query1 = mysqli_query($conn, "UPDATE `registration` SET `username` = '$username', `pass` = '$pass', `lname` = '$lname', `fname` = '$fname', `mname` = '$mname', `bdate` = '$bdate', `useremail` = '$useremail', `cnum` = '$cnum', `gender` = '$gender', `empstatus` = '$empstatus', `disability` = '$disability', `additional` = '$additional', `address1` = '$address1', `address2` = '$address2', `country` = '$country', `region` = '$region', `prov` = '$prov', `city` = '$city', `brgy` = '$brgy', `pcode` = '$pcode', `membertyper` = '$membertyper', `memberdur` = '$memberdur', `ref` = '$ref', `memberfile` = '$memberfile', `verif1` = '$verif1', `verif2` = '$verif2' WHERE `registration`.`id` = $userid");
    }$userid = $userinfo['id'];
    
    $username =$userinfo['username'];
    $pass = $userinfo['pass'];
    $lname = $userinfo['lname'];
    $fname = $userinfo['fname'];

    if(empty($userinfo['mname'])){
        $mname = " ";
    }
    else {
        $mname = $userinfo['mname'];
    }

    $bdate = $userinfo['bdate'];
    $useremail = $userinfo['useremail'];
    $cnum = $userinfo['cnum'];
    $gender = $userinfo['gender'];
    $empstatus = $userinfo['empstatus'];
    $disability = $userinfo['disability'];

    if(empty($userinfo['additional'])){
        $additional = " ";
    }
    else {
        $additional = $userinfo['additional'];
    }

    $address1 = $userinfo['address1'];

    if(empty($userinfo['address2'])){
        $address2 = " ";
    }
    else {
        $address2 = $userinfo['address2'];
    }

    $country = $userinfo['country'];
    $region = $userinfo['region'];
    $prov = $userinfo['prov'];
    $city = $userinfo['city'];
    $brgy = $userinfo['brgy'];
    $pcode = $userinfo['pcode'];
    $membertyper = $userinfo['membertyper'];
    $memberdur = $userinfo['memberdur'];

    if(empty($userinfo['ref'])){
        $ref = " ";
    }
    else {
        $ref = $userinfo['ref'];
    }

    if(empty($userinfo['memberfile'])){
        $memberfile = " ";
    }
    else {
        $memberfile = $userinfo['memberfile'];
    }

    $verif1 = $userinfo['verif1'];
    $verif2 = $userinfo['verif2'];

    $conn = mysqli_connect('localhost', 'root', '', 'database');
    if(!$conn){
        die('Connection Failed : '.mysqli_connect_error());
    }
    else{
        $query1 = mysqli_query($conn, "UPDATE `registration` SET `username` = '$username', `pass` = '$pass', `lname` = '$lname', `fname` = '$fname', `mname` = '$mname', `bdate` = '$bdate', `useremail` = '$useremail', `cnum` = '$cnum', `gender` = '$gender', `empstatus` = '$empstatus', `disability` = '$disability', `additional` = '$additional', `address1` = '$address1', `address2` = '$address2', `country` = '$country', `region` = '$region', `prov` = '$prov', `city` = '$city', `brgy` = '$brgy', `pcode` = '$pcode', `membertyper` = '$membertyper', `memberdur` = '$memberdur', `ref` = '$ref', `memberfile` = '$memberfile', `verif1` = '$verif1', `verif2` = '$verif2' WHERE `registration`.`id` = $userid");
        $query2 = mysqli_query($conn, "SELECT * FROM registration WHERE username='$username'");
        $result = mysqli_fetch_all($query2, MYSQLI_ASSOC);
        exit(json_encode($result));
    }
}

