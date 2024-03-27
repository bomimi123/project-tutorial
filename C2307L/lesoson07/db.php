<?php
    $severname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "student_management";

    $conn = new mysqli($severname, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: " . $cxonn->connect_error);
    }
?>	