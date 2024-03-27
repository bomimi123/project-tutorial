<?php
session_start();

// Kiểm tra xem đã submit form từ trang Login chưa
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    // Lấy thông tin từ form
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Thêm thông tin vào session
    $_SESSION['users'][] = [
        'username' => $username,
        'email' => $email,
        'password' => $password,
    ];
}

// Hiển thị danh sách người dùng
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management User</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Management User</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Hiển thị danh sách người dùng từ session
                if (isset($_SESSION['users'])) {
                    foreach ($_SESSION['users'] as $key => $user) {
                        echo "<tr>
                                <th scope='row'>" . ($key + 1   ) . "</th>
                                <td>{$user['username']}</td>
                                <td>{$user['email']}</td>
                                <td>{$user['password']}</td>
                              </tr>";
                    }
                }
                ?>
                        <a href="login.php" class="btn btn-secondary mb-3">Back to Login</a>

            </tbody>
        </table>
    </div>
</body>
</html>
