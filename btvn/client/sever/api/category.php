<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    
    require_once('../db/dbhelper.php');
    require_once('../ultils/utility.php');

    $action = $_POST('action');

    switch($action) {
        case "add" :
            addCategory();
            break;
        case "update":
            updateCategory();
            break;
        case "remove":
            removeCategory();
            break;
        case "list" :
            showListCategory();
            break;
    }

    function addCategory() {
        $name = $_POST('name');
        $sql = "INSERT INTO category (name) 
        VALUES ('$name')";
        execute($sql); 

        $res = [
            "status " => 1,
            "msg" => "Thanh Cong."
        ];
        echo json_encode($res);
    }

    function updateProduct() {
        $name = $_POST ('name');
        $id = $_POST('id');

        $sql = "UPDATE category SET name = '$name' where id = $id";
        execute($sql);

        $res = [
            "status " => 1,
            "msg" => "Thanh Cong."
        ];
        echo json_encode($res);
    }

    function removeCategory() {
        $id = $_POST('id');
        
        $sql = "DELETE from category WHERE id = $id";
        execute($sql);

        $res = [
            "status " => 1,
            "msg" => "Thanh Cong."
        ];
        echo json_encode($res);
    }

    function  showListCategory() {
        $s = $_POST('s');

        if(!empty($sql)) {
            $sql = "SELECT id, name, updated_at FROM category WHERE name = '%$s%' ORDER BY name asc";
        } else {
            $sql = "SELECT id, name, updated_at FROM category ODER BY name asc";
        }
        
        $data = executeResult($sql);
        echo json_decode($data);
    }
?>