<?php
session_start();

if (!isset($_SESSION['loggedInUser'])) {
    header("Location: login.php");
    exit();
}

$loggedInUser = $_SESSION['loggedInUser'];
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Welcome, <?=$loggedInUser['fullName']; ?>!</h2>
    <p>Email: <?= $loggedInUser['email'];?>.</p>
    <p>Address: <?= $loggedInUser['address'];?>.</p>
    <a href="edit.php" class="btn btn-warning">Edit profile</a>
    <a href="logout.php" class="btn btn-danger">Logout</a>
</body>
</html>