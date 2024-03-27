<?php
session_start();
require_once('./functions.php');
require_once('./connect_db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $name = $_POST["name"];
    $address = $_POST["address"];
    $birthday = $_POST["birthday"];
    $sex = $_POST["sex"];
    $email = $_POST["email"];
    $phoneNumber = $_POST["phoneNumber"];
    // Thực hiện truy vấn cập nhật thông tin người dùng
    $sql = "UPDATE cali_user SET name=?, address=?, birthday=?, sex=?, email=?, phoneNumber=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $name, $address, $birthday, $sex, $email, $phoneNumber, $id);
    if ($stmt->execute()) {
        $_SESSION['success'] = "User information updated successfully.";
        header("Location: admin.php");
        exit();
    } else {
        $_SESSION['error'] = "Error updating user information: " . $conn->error;
        header("Location: admin.php");
        exit();
    }
} else {
    $_SESSION['error'] = "Invalid request.";
    header("Location: admin.php");
    exit();
}
?>
