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

    // Lấy thông tin người dùng theo ID
    $sql = "SELECT * FROM users WHERE id=$id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
    } else {
        displayError("User not found");
        exit;
    }
} else {
    displayError("Invalid request");
    exit;
}

// Xử lý sự kiện khi form được gửi đi
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newUsername = $_POST["newUsername"];
    $newEmail = $_POST["newEmail"];

    // Cập nhật thông tin người dùng
    $updateSql = "UPDATE users SET username='$newUsername', email='$newEmail' WHERE id=$id";

    if ($conn->query($updateSql) === TRUE) {
        displaySuccess("User information updated successfully!");
    } else {
        displayError("Error updating user information: " . $conn->error);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <title>Edit User</title>
</head>
<body>
    <div class="container mt-5">
        <h2>Edit User</h2>
        <form method="post" action="edit.php?id=<?php echo $id; ?>">
            <div class="form-group">
                <label for="newUsername">New Username:</label>
                <input type="text" class="form-control" name="newUsername" value="<?php echo $user["username"]; ?>" required>
            </div>
            <div class="form-group">
                <label for="newEmail">New Email:</label>
                <input type="email" class="form-control" name="newEmail" value="<?php echo $user["email"]; ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
        <a href="welcome.php" class="btn btn-secondary mt-3">Back to Welcome</a>
    </div>
</body>
</html>
