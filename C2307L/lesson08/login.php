<?php
    require_once('login.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Register</title>
    <style>
        body{
            background: linear-gradient(to right, #D9AFD9, #97D9E1);
        }
	
        .form-group{
            margin:1rem;
        }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
</head>
<body class="container mt-5" >
    <div class="panel panel-primary">
        <h2 class="text-center panel-heading">Login page</h2>
        <form class="panel-body"  method="post">
            <div class="form-group">
                <label for="username">Username: </label>
                <input class="form-control" type="text" name="username" id="username" placeholder="Enter Username" required="true">
            </div>

            <div class="form-group">
                <label for="password">Password: </label>
                <input class="form-control" type="password" name="password" id="password" placeholder="Enter password" required="true">
            </div>
            <button class="btn btn-warning">Login</button>
            <p class="link m-2">
                <a href="register.php">Chưa có tài khoản vui lòng đăng ký tại đây!</a>
            </p>
        </form>


    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>