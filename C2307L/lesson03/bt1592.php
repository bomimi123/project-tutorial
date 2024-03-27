<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>quan ly sach</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container" mt-5>
        <?php
        $N = rand(1, 100);
        
        // tao bien boook voi gia tri rong
        $book = [];
        for ($i = 1; $i < $N; $i++) {
            $book [
                'ten' => 'quyen sach'. $i,
                'tac gia' => 'tac gia'. $i,
                'gia' => rand(50, 200),
                'nha xuat ban' => 'nha xuat ban' . $i,
            ];
        
            $books[] = $book,
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
                <?php foreach($books as $key => $book): ?>
                    <tr>
                        <td scope="row">
                            <?php 
                                echo $key + 1;
                            ?>    
                        </td>
                        <td><?php $book['ten']?></td>
                        <td><?php $book['tac gia'] ?></td>
                        <td><?php $book['gia']?></td>
                        <td><?php $book['nha xuat ban'] ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>