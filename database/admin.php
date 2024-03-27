<?php
require_once('./connect_db.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h2>User Management </h2>
        <?php
        session_start();
        // Hiển thị thông báo nếu có
        if (isset($_SESSION['success'])) {
            echo "<div class='alert alert-success' role='alert'>" . $_SESSION['success'] . "</div>";
            unset($_SESSION['success']); // Xóa thông báo sau khi đã hiển thị
        }
        ?>

        <!-- Bảng hiển thị thông tin người dùng -->
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Birthday</th>
                    <th>Sex</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $sql = "SELECT * FROM cali_user";
                    $result = $conn->query($sql);

                    if($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            // Kiểm tra nếu người dùng không phải là admin thì hiển thị thông tin
                            if ($row["role"] != 1) {
                                echo "<tr>";
                                echo "<td>". $row["name"] . "</td>";
                                echo "<td>". $row["address"] . "</td>";
                                echo "<td>". $row["birthday"] . "</td>";
                                echo "<td>". $row["sex"] . "</td>";
                                echo "<td>". $row["email"] . "</td>";
                                echo "<td>". $row["phoneNumber"] . "</td>";
                                echo "<td>
                                    <a href='./fix_user.php?id=" .$row["id"] . "' class='btn btn-warning'>Edit</a>
                                    <a href='./delete_user.php?id=" .$row["id"] . "' class='btn btn-danger' onclick='return confirm(\"Are you sure you want to delete this user?\")'>Delete</a>
                                    </td>";
                                echo "</tr>";
                            }
                        }
                    } else {
                        echo "<tr> <td colspan='7'>No user found</td></tr>";
                    }
                    
                    $conn->close();
                ?>
            </tbody>
        </table>



        <a href="./add_user.php" class="btn btn-primary">Add user</a>
        <button onclick="logout()" class="btn btn-secondary">Logout</button>
    </div>

    <script>
        function logout() {
            var confirmLogout = confirm("Bạn có muốn đăng xuất không?");
            if (confirmLogout) {
                window.location.href = './login.php'; // Chuyển hướng đến trang logout.php để xử lý đăng xuất
            }
        }
    </script>
</body>
</html>
