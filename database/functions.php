<?php
require_once('./connect_db.php');

// Hàm thêm tài khoản người dùng
function add_user($name, $address, $birthday, $sex, $email, $phoneNumber, $username, $password, $role) {
    global $conn;

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO cali_user (name, address, birthday, sex, email, phoneNumber, username, password, role) 
            VALUES ('$name', '$address', '$birthday', '$sex', '$email', '$phoneNumber', '$username', '$hashed_password', '$role')";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Hàm sửa thông tin tài khoản người dùng
function edit_user($id, $name, $address, $birthday, $sex, $email, $phoneNumber, $username, $password, $role) {
    global $conn;

    // Kiểm tra xem mật khẩu đã được nhập hay không
    if ($password != '') {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE cali_user 
                SET name='$name', address='$address', birthday='$birthday', sex='$sex', email='$email', phoneNumber='$phoneNumber', username='$username', password='$hashed_password', role='$role' 
                WHERE id='$id'";
    } else {
        $sql = "UPDATE cali_user 
                SET name='$name', address='$address', birthday='$birthday', sex='$sex', email='$email', phoneNumber='$phoneNumber', username='$username', role='$role' 
                WHERE id='$id'";
    }

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Hàm xoá tài khoản người dùng
function delete_user($id) {
    global $conn;

    $sql = "DELETE FROM cali_user WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Đóng kết nối cơ sở dữ liệu
function close_connection() {
    global $conn;
    $conn->close();
}
?>
