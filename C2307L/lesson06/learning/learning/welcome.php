<?php
require_once("database.php");
require_once("function.php");

session_start(); // Bắt đầu session

// Kiểm tra xem người dùng đã đăng nhập hay chưa
if (!isset($_SESSION["username"])) {
    redirectTo("login.php");
}

// Lấy danh sách người dùng từ CSDL
$sql = "SELECT * FROM users";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <title>Welcome</title>
</head>
<body>
    <div class="container mt-5">
        <h2>Welcome, <?php echo $_SESSION["username"]; ?>!</h2>
        
        <h3>All Users:</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id"] . "</td>";
                    echo "<td>" . $row["username"] . "</td>";
                    echo "<td>" . $row["email"] . "</td>";
                    echo "<td>
                            <a href='edit.php?id=" . $row["id"] . "' class='btn btn-primary'>Edit</a>
                            <a href='delete.php?id=" . $row["id"] . "' class='btn btn-danger'>Delete</a>
                          </td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>

        <a href="logout.php" class="btn btn-danger">Logout</a>
    </div>
</body>
</html>
