<?php
    require_once('db.php');

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $fullName = $_POST['fullName'];
        $age = $_POST['age'];
        $address = $_POST['address'];

        // truy van sql de them du lieu 
        $sql = "INSERT INTO student (full_name, age, address) 
        VALUES ('$fullName', '$age' ,'$address')";

        // thuc hien truy van
        if($conn->query($sql) === TRUE) {
            echo " Sinh viên đã được thêm mới thành công.";
            header('Localtion: management.php');
            exit();
        } else {
            echo "Lỗi. " . $conn->error;
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Register User </h2>
        <form action="" method="post">
            <div class="form-group">
                <label for="fullName">Full name:</label>
                <input type="text" class="form-control" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" class="form-control" id="age" name="age" required>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" class="form-control" id="address" name="address" required>
            </div>
            <button type="submit" class="btn btn-success">Save</button>
        </form>
    </div>
</body>
</html>