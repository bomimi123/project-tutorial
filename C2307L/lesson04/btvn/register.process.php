<?php
    if($_SERVER["REQUEST-METHOD"] == "POST") {
        $fullname = $_POST["fullname"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $address = $_POST["address"];

        //save info vao cookie
        $user_info = [
            'fullname' => $fullname,
            'email' => $email,
            'password' => $password,
            'address' => $address
        ];
        $encoded_user_info = base64_encode(json_encode($user_info));
        setcookie('user_info', $encoded_user_info, time() + (86400 * 30), "/");
    
        // chuyen huong den page login
        header ("Location: login_process.php");
        exit();
    }
?>
