<?php
session_start();
$username = $_POST['username'];
$pass = $_POST['pass'];
$lname = $_POST['lname'];
$fname = $_POST['fname'];

if(empty($_POST['mname'])){
    $mname = " ";
}
else {
    $mname = $_POST['mname'];
}

$bdate = $_POST['bdate'];
$useremail = $_POST['useremail'];
$cnum = $_POST['cnum'];
$gender = $_POST['gender'];
$empstatus = $_POST['empstatus'];
$disability = $_POST['disability'];

if(empty($_POST['additional'])){
    $additional = " ";
}
else {
    $additional = $_POST['additional'];
}

$address1 = $_POST['address1'];

if(empty($_POST['address2'])){
    $address2 = " ";
}
else {
    $address2 = $_POST['address2'];
}

$country = $_POST['country'];
$region = $_POST['region'];
$prov = $_POST['prov'];
$city = $_POST['city'];
$brgy = $_POST['brgy'];
$pcode = $_POST['pcode'];
$membertyper = $_POST['membertyper'];
$memberdur = $_POST['memberdur'];

if(empty($_POST['ref'])){
    $ref = " ";
}
else {
    $ref = $_POST['ref'];
}

if(empty($_POST['memberfile'])){
    $memberfile = " ";
}
else {
    $memberfile = $_POST['memberfile'];
}

$verif1 = $_POST['verif1'];
$verif2 = $_POST['verif2'];

$conn = new mysqli('localhost', 'root', '', 'database');
if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
}
else {
    $stmnt = $conn->prepare("insert into registration(username, pass, lname, fname, mname, bdate, useremail, cnum, gender, empstatus, disability, additional, address1, address2, country, region, prov, city, brgy, pcode, membertyper, memberdur, ref, memberfile, verif1, verif2)
    values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmnt->bind_param("sssssssisssssssssssisissss", $username, $pass, $lname, $fname, $mname, $bdate, $useremail, $cnum, $gender, $empstatus, $disability, $additional, $address1, $address2, $country, $region, $prov, $city, $brgy, $pcode, $membertyper, $memberdur, $ref, $memberfile, $verif1, $verif2);
    $stmnt->execute();
    $stmnt->close();
    $conn->close();
}
session_destroy();