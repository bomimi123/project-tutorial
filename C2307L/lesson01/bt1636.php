<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
       $N = 10;
       $randomArray = array();

       for($i = 0; $i < $N; $i++) {
            $randomArray[] = rand(1, 100);
       }

       // sap xep array
       sort($randomArray);

       // hien thi mang goc
       echo "Mang goc: ";
       print_r($randomArray);

       // hien thi mang sau khi sap xep
       echo "<br/>mang sau khi sap xep: ";
       print_r($randomArray);
    ?>
</body>
</html>