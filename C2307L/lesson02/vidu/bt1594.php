<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form đăng ký tài khoản</title>
    <!-- bootrstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></head>
<body>
    <div class="container mt-5">
        <h2>Form đăng ký tài khoản</h2>
        <form action="" method="post">
            <div class="mb-3">
                <label for="username" class="form-label">UserName:</label>
                <input type="text" class="form-control" id="username" name="username" require>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" name="email" require>
            </div>

            
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" name="password" require>
            </div>
            <button type="submit" class="btn btn-success" name="register">Register</button>
         </div>
     </form>
    

     <?php
        if(isset($_POST['register'])) {
            $username = isset(
                $_POST['username']) 
            ? 
                $_POST['username'] : ''; 

            $email = isset (
                $_POST['email'])
            ? 
                $_POST['email'] : '';
            
            $password = isset (
                $_POST['password'])
            ?
                $_POST['password'] : '';

            // hien thi thong tin da nhap
            echo  '<div class="mt-3 justify-center">';
                echo '<h3>Thong tin da nhap: </h3>';
                echo '<p><strong>Username: </strong>' .$username . '</p>';
                echo '<p><strong>Email: </strong>' .$email . '</p>';
                echo '<p><strong>Password: </strong>' .$password . '</p>';
            echo '</div>';
        }
    ?>  
</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>