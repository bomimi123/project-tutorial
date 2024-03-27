<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management Libray</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <?php
            $N = rand(3, 15);

            $bookList = [];

            for($i = 1; $i < $N; $i++) {
                $books = [
                    'title' => 'Sách'. ($i + 1),
                    'thumpnail' =>  'image'. ($i +1) .'jpg',
                    'price' => rand(20, 200),
                ];

                $bookList[] = $books;
            }
        ?>

        <table class =" table table-bordered">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tiêu đề</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Giá</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($bookList as $key => $books): ?>
                    <tr>
                        <th scope="row"><? $key + 1?></th>
                        <td><?php $books['title'] ?></td>
                        <td><img src="<?php $books['thumpnail'] ?>" alt="<?php $books['title'] ?>" style="maw-width: 100px;"></td>
                        <td><?php $books['price']?></td>
                    </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
    
</body>
</html>