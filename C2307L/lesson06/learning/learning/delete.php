<?php
require_once("database.php");
require_once("function.php");

session_start(); // Bắt đầu session

// Kiểm tra xem người dùng đã đăng nhập hay chưa
if (!isset($_SESSION["username"])) {
    redirectTo("login.php");
}

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    // Xóa người dùng theo ID
    $deleteSql = "DELETE FROM users WHERE id=$id";

    if ($conn->query($deleteSql) === TRUE) {
        displaySuccess("User deleted successfully!");
    } else {
        displayError("Error deleting user: " . $conn->error);
    }
} else {
    displayError("Invalid request");
}

// Chuyển hướng về trang welcome.php sau khi xóa
redirectTo("welcome.php");
?>
