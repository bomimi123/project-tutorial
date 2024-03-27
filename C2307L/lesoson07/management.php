<?php
    require_once('db.php');
    require_once('deleteStudent.php');

    // xu ly tim kiem
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['search'])) {
        $searchTeam = $_POST['searchTeam'];
        $sql = "SELECT * FROM student WHERE full_name LIKE '%$searchTeam%'";
        $result = $conn->query($sql);
        $students = [];

        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $students[] = $row;
            }
        }
    } else {
        // lay tat ca sinh vien neu khong co tim kiem
        $sql = "SELECT * FROM student";
        $result = $conn->query($sql);
        $students = [];

        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $students[] = $row;
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>management</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class= "container mt-5">
        <h2>Management Student's Details Information</h2>
        <form action="" method="post" >
            <div class="form-group">
                <label for="searchName">Tim kiem:</label>
                <input type="text" class="form-control" id="searchName" name="searchName" required>
            </div>
            <button type="submit" class="btn btn-success mt-2" name="search">Tim kiem</button>
        </form>

        <table class="table table bordered mt-3">
            <thead>
                <tr>    
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($students as $index => $student): ?>
                    <tr>
                        <td><?php echo $index + 1; ?></td>
                        <td><?php echo $student['full_name']; ?></td>
                        <td><?php echo $student['age']; ?></td>
                        <td><?php echo $student['address']; ?></td>
                        <td>
                            <!-- Nút Xóa và Hiển thị xác nhận -->
                            <form method="post">
                                <input type="hidden" name="studentIdToDelete" value="<?php echo $student['id']; ?>">
                                <button type="submit" class="btn btn-danger" name="delete" onclick="return confirm('Bạn có chắc muốn xóa không?')">Xóa</button>
                            </form>
                            <!-- Nút Sửa và Chuyển hướng đến trang sửa -->
                            <a href="editStudent.php?id=<?php echo $student['id']; ?>" class="btn btn-warning">Sửa</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <!-- Hiển thị thông báo khi xóa thành công -->
        <?php if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])): ?>
            <div class="alert alert-success mt-3">
                <?php echo "Đã xóa sinh viên thành công."; ?>
            </div>
        <?php endif; ?>

        <!-- Nút để link về trang registerUser.php -->
        <a href="registerUser.php" class="btn btn-primary mt-3">Quay lại trang đăng ký sinh viên</a>
        <a href="management.php" class="btn btn-warning mt-3">Quay lại trang quản lý</a>
    </div>
</body>
</html>
        </table>
    </div>
</body>
</html>