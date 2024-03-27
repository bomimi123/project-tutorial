<?php
    session_start();

    header('Access-Control-Allow-Origin: *');
    
    require_once('../db/dbhelper.php');
    require_once('../ultils/utility.php');

    $action = getPOST('action');

    switch($action) {
        case "add" :
            addProduct();
            break;
        case "update":
            updateProduct();
            break;
        case "remove":
            removeProduct();
            break;
        case "list" :
            showListProduct();
            break;
    }

    function addProduct() {
        $title = getPOST('title');
        $price = getPOST('price');
        $thumbnail = getPOST('thumbnail');
        $content = getPOST('content');

        $sql = "INSERT  INTO product(title, price, thumbnail, content )
        VALUES ('$title', '$price', '$thumbnail', '$content')";
        excute($sql);

        $res = [
            "status " => 1,
            "msg" => "Thanh Cong."
        ];
        echo json_encode($res);
    }

    function updateProduct() {
        $id = getPOST('id');
        $title = getPOST('title');
        $price = getPOST('price');
        $thumbnail = getPOST('thumbnail');
        $content = getPOST('content');
    
        $sql = "UPDATE product SET title = '$title', price = '$price', thumbnail = '$thumbnail', content = '$content' WHERE id = $id";
        
        execute($sql);

        $res = [
            "status " => 1,
            "msg" => "Thanh Cong."
        ];
        echo json_encode($res);
    }

    function removeProduct() {
        $id = getPOST('id');
        
        $sql = "DELETE from product WHERE id = $id";
        execute($sql);

        $res = [
            "status " => 1,
            "msg" => "Thanh Cong."
        ];
        echo json_encode($res);
    }

    function  showListProduct() {
        $s = getPOST('s');

        if(!empty($sql)) {
            $sql = "SELECT * FROM product WHERE title = '%$s%' order by title asc";
        } else {
            $sql = "SELECT * FROM procut ORDER BY title asc";
        }
        
        $data = executeResult($sql);
        echo json_decode($data);
    }

    //CRUD - CREATE UPDATE DELTE



?>