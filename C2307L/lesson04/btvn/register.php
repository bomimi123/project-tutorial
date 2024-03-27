<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký page</title>
    <!-- link boostrap here -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        button{
            margin-top:2rem;
        }

    </style>
</head>
<body>
    <div class="container mt-5">
        <h2>Đăng ký</h2>
        <form action="login.php">
            <div classs="form-group">
                <label for="fullname">Họ Tên:</label>
                <input type="text" class="form-control" name="fullname" require>
            </div>
            <div classs="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" name="email" require>
            </div>
            <div classs="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" class="form-control" name="password" require>
            </div>
            <div classs="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" class="form-control" name="address" require>
            </div>
            <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>