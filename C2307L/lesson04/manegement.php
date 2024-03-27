<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Manegement</title>
      <!-- link boostrap -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
        <h2>Page of manegement</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <!-- code php -->
                <? 
                    // khoi tao session
                    session_start();

                    // kiem tra xem co du lieu tu index.php gui tu form len post hay khong
                    if($_SERVER["REQUEST_METHOD"])
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>