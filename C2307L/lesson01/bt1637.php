<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    // phương pháp tính đệ quy có nhớ
    function fibonacciCount($n, &$count) {
        if ($n <= 1) {
            return 1;   
        }

        if(!isset($count[$n])) {
            $count[$n] = fibonacciCount($n - 1, $count) +
            fibonacciCount($n - 2, $count);
        }
        return $count[$n];
    }

    echo "10 phần tử của dãy Fibonaci: ";
    $count = array();
        for($i = 0; $i < 10; $i++) {
            echo fibonacciCount($i, $count) . " ";
        }
    ?>
</body>
</html>