<?php
session_start();

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng về input.php
if (!isset($_SESSION['username'])) {
    header("Location: input.php");
    exit();
}

// Lấy thông tin người dùng từ phiên
$username = $_SESSION['username'];
$email = $_SESSION['email'];
$password = $_SESSION['password'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Chào Mừng</title>
</head>
<body>

    <h2>Chào mừng <?php echo $username; ?></h2>

    <table border="1">
        <tr>
            <th>Tên Tài Khoản</th>
            <th>Email</th>
            <th>Mật Khẩu</th>
        </tr>
        <tr>
            <td><?php echo $username; ?></td>
            <td><?php echo $email; ?></td>
            <td><?php echo $password; ?></td>
        </tr>
    </table>

    <br>
    <a href="input.php">Chỉnh Sửa</a>

</body>
</html>
