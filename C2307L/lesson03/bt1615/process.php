<?php
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if username is '@tên bạn' and password is '123'
    if ($username == '@gokisoft' 
        && $email == 'gokisoft.com@gmail.com'
        && $password == '123456')
        echo $username
        echo  {
        // Redirect to welcome.php
        header("Location: welcome.php?username=$username&password=$password");
        exit();
    } else {
        echo "Invalid credentials. Please try again.";
    }

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="welcome.php">welcome</a>
</body>
</html>
