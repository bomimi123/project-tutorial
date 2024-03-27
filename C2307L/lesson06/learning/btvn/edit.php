<?php
session_start();

if (!isset($_SESSION['loggedInUser'])) {
    header("Location: login.php");
    exit();
}

$loggedInUser = $_SESSION['loggedInUser'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Xử lý logic sửa thông tin người dùng
    $updatedUser = [
        'fullName' => $_POST['fullName'],
        'email' => $_POST['email'],
        'address' => $_POST['address'],
    ];

    // Kiểm tra các điều kiện cần thiết (ví dụ: kiểm tra định dạng email)
    if (!filter_var($updatedUser['email'], FILTER_VALIDATE_EMAIL)) {
        $errorMessage = "Invalid email format";
    } else {
        // Cập nhật thông tin trong session
        $_SESSION['loggedIn User'] = $updatedUser;
        header("Location: welcome.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>

<body class="container mt-5">
    <h2>Edit Profile</h2>
    <?php if (isset($errorMessage)) : ?>
        <div class="alert alert-danger" role="alert">
            <?= $errorMessage ?>
        </div>
    <?php endif; ?>
    <form method="post">
        <div class="form-group">
            <label for="fullName">Full Name:</label>
            <input type="text" class="form-control" id="fullName" name="fullName" value="<?= $loggedInUser['fullName']; ?>" required>
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" name="email" value="<?= $loggedInUser['email']; ?>" required>
        </div>

        <div class="form-group">
            <label for="address">Address:</label>
            <input type="text" class="form-control" id="address" name="address" value="<?= $loggedInUser['address']; ?>" required>
    </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
    <a href="welcome.php" class="btn btn-secondary mt-3">Back to Welcome</a>
</body>

</html>
