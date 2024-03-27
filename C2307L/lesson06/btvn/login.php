<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2 class="mb-4 text-success">User Management</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Đọc thông tin người dùng từ tệp users.txt
                $usersData = file_get_contents('users.txt');
                $usersArray = explode(PHP_EOL, $usersData);

                foreach ($usersArray as $key => $userData) {
                    if (!empty($userData)) {
                        $user = json_decode($userData, true);
                        echo "<tr>
                                <th scope='row'>" . ($key + 1) . "</th>
                                <td>{$user['username']}</td>
                                <td>{$user['email']}</td>
                                <td>{$user['password']}</td>
                            </tr>";
                    }
                }
                ?>
            </tbody>
        </table>
        <a href="register.php" class="btn btn-primary">Back to Register</a>
    </div>
</body>
</html>
