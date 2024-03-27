<?php
$name = $email = $pwd = '';
if (isset($_POST['username'])) {
    $name = $_POST['username'];
}
if (isset($_POST['email'])) {
    $email = $_POST['email'];
}
if (isset($_POST['password'])) {
    $pwd = $_POST['password'];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Popper JS -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
</head>
<body>
    <div class="container" style="margin-top: 50px;">
        <table class="table table-bordered">
            <tbody>
            <tr>
                <td>Tên Tài Khoản</td>
                <td><?= $name ?></td>
            </tr>
            <tr>
                <td>Email</td>
                <td><?= $email ?></td>
            </tr>
            <tr>
                <td>Mật Khẩu</td>
                <td><?= $pwd?>
                <a href="input.php" style="color: rgb(255, 0, 0); background-color: rgb(255, 255, 0); font-weight: bold;">(edit)</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</body>
</html>