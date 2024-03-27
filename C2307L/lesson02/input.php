<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
        <ul class="list-group">
            <li class="list-group-item active">Input detail information</li>
            <li class="list-group-item">
                <form action="welcome.php" method="post">
                    <div class="form-group">
                        <label for="username">UserName: </label>
                        <input type="text" class="form-control" id="username" name="username">
                    </div>

                    <div class="form-group">
                        <label for="email">Email: </label>
                        <input type="email" class="form-control" id="email" name="email">
                    </div>

                    <div class="form-group">
                        <label for="password">Password: </label>
                        <input type="text" class="form-control" id="password" name="passwod">
                    </div>
                    <button type="submit" class="btn btn-success">Register</button>
                </form>
            </li>
        </ul>
    </div>

    <!-- php -->
    <?php
        $name = $email = $password = '';
        if (!empty ($_POST)) {
            if (isset($_POST ['username'])) {
                $name = $_POST['username'];
            }
            if (isset($_POST)) {
                $email = $_POST ['email'];
            }
            if(isset($_POST ['password'])) {
                $password = $_POST['password'];
            }
        }
    ?>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>