<?php
require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $studentIdToEdit = $_GET['id'];
    $sql = "SELECT * FROM students WHERE id = $studentIdToEdit";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $student = $result->fetch_assoc();
    } else {
        echo "Không tìm thấy sinh viên có ID $studentIdToEdit";
        exit;
    }
} else {
    echo "Invalid request";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit'])) {
    $newFullName = $_POST['newFullName'];
    $newAge = $_POST['newAge'];
    $newAddress = $_POST['newAddress'];

    $sqlEdit = "UPDATE students SET full_name = '$newFullName', age = $newAge, address = '$newAddress' WHERE id = $studentIdToEdit";

    if ($conn->query($sqlEdit) === TRUE) {
        echo "Đã sửa thông tin sinh viên thành công.";
    } else {
        echo "Lỗi khi sửa thông tin sinh viên: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <title>Edit Student Information</title>
</head>
<body>
    <div class="container mt-5">
        <h2>Edit Student Information</h2>

        <form method="post" action="editStudent.php?id=<?php echo $studentIdToEdit; ?>">
            <div class="form-group">
                <label for="newFullName">New Full Name:</label>
                <input type="text" class="form-control" id="newFullName" name="newFullName" value="<?php echo $student['full_name']; ?>" required>
            </div>
            <div class="form-group">
                <label for="newAge">New Age:</label>
                <input type="number" class="form-control" id="newAge" name="newAge" value="<?php echo $student['age']; ?>" required>
            </div>
            <div class="form-group">
                <label for="newAddress">New Address:</label>
                <input type="text" class="form-control" id="newAddress" name="newAddress" value="<?php echo $student['address']; ?>" required>
            </div>
            <button type="submit" class="btn btn-primary" name="edit">Save</button>
            <a href="management.php" class="btn btn-secondary">Back to Management</a>
        </form>
    </div>
</body>
</html>
