<?php
require_once('./connect_db.php');

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $address = $_POST["address"];
    $birthday = $_POST["birthday"];
    $sex = $_POST["sex"]; 
    $phoneNumber = $_POST["phoneNumber"];
    $password = $_POST["password"];

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $sql = "INSERT INTO cali_user (name, address, birthday, sex, email, phoneNumber, username, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssss", $name, $address, $birthday, $sex, $email, $phoneNumber, $name, $hashed_password);

    if ($stmt->execute()) {
        header("Location: admin.php?msg=success");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
?>
