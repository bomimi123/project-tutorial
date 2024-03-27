<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý sách</title>
    <!-- thêm bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
    <?php
        // số lượng sách(N)
        $N = rand(1, 100);

        $book = [];

        for($i = 1; $i < $N; $i++) {
            $book = [
                'Tên' => 'Quyển sách'. $i,
                'Tác giả' => 'Tác giả'. $i,
                'Giá' => rand(50, 200),
                'Nhà xuất bản' => 'Nhà xuất bản' .$i,
            ];  

            // thêm thông tin sách vào mảng
            $books[] = $book;
        }
        ?>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Tác giả</th>
                    <th scope="col">Giá bán</th>
                    <th scope="col">Nhà xuất bản</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($books as $key => $book): ?>
                <tr>
                    <th scope="row"><?php echo $key + 1; ?></th>
                    <td><?php $book['Tên'] ?></td>
                    <td><?php $book['Tác giả'] ?></td>
                    <td><?php $book['Giá'] ?></td>
                    <td><?php $book['Nhà xuất bản'] ?></td>
                </tr>        
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>