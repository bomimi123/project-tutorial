<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Page</title>
</head>
<body>
    <h2>Edit Page</h2>
    <?php
    if (isset($_GET['username']) && isset($_GET['email']) && isset($_GET['password']) ) {
        $username = $_GET['username'];
        $email = $_GET['email'];
        $password = $_GET['password'];
    ?>
    <form action="update.php" method="post">
        <label for="newUsername">New Username:</label>
        <input type="text" name="newUsername" value="<?php echo $username; ?>" required>
        <br>
        <label for="newEmail">New Email: </label>
        <input type="email" name="newEmail" value= "<?php echo $email; ?>" required>
        <br>
        <label for="newPassword">New Password:</label>
        <input type="password" name="newPassword" value="<?php echo $password; ?>" required>
        <br>
        <input type="submit" name="update" value="Update">
    </form>
    <?php
    } else {
        echo "Invalid access. Please register first.";
    }
    ?>
</body>
</html>
