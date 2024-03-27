<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $address = $_POST["address"];

    // Lưu thông tin đăng ký vào cookie
    $user_info = [
        'fullname' => $fullname,
        'email' => $email,
        'password' => $password,
        'address' => $address
    ];

    $encoded_user_info = base64_encode(json_encode($user_info));
    setcookie('user_info', $encoded_user_info, time() + (86400 * 30), "/"); // 86400 = 1 day

    // Chuyển hướng đến trang đăng nhập
    header("Location: welcome.php");
    exit();
}
?>
