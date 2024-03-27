<?php
    $severname = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'project';

    $conn = new mysqli($severname, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    function hashPassword($password) {
        return password_hash($password, PASSWORD_BCRYPT);
    }
?>