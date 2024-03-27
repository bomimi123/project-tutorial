<?php
session_start();

// Kiểm tra nếu người dùng đã đăng nhập
if (!isset($_SESSION['username'])) {
    // Kiểm tra khi người dùng click vào Register
    if (isset($_POST['register'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Kiểm tra tên đăng nhập và mật khẩu
        if ($username == '@tenban' && $password == '123') {
            // Lưu thông tin người dùng vào phiên
            $_SESSION['username'] = $username;
            $_SESSION['email'] = 'tenban@gmail.com';
            $_SESSION['password'] = $password;

            header("Location: welcome.php");
            exit();
        } else {
            echo "Tên đăng nhập hoặc mật khẩu không đúng.";
        }
    }
} else {
    // Nếu người dùng đã đăng nhập, chuyển hướng đến welcome.php
    header("Location: welcome.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký tài khoản</title>
</head>
<body>

    <h2>Form Đăng Ký Tài Khoản</h2>

    <form method="post" action="input.php">
        <label for="username">Tên Tài Khoản:</label>
        <input type="text" name="username" required>
        <br>
		<label for="email">email:</label>
        <input type="email" name="email" required>
        <br>
        <label for="password">Mật Khẩu:</label>
        <input type="password" name="password" required>
        <br>
        <input type="submit" name="register" value="Đăng Ký">
    </form>

</body>
</html>
