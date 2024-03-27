<?php
require_once('database-helper.php');

$name = $thumbnail = $content = $price = $idEdit ='' ;
if(!empty($_POST)){
    $id = getPOST('id');
    $action = getPOST('action');
    switch($action){
        case 'delete':
            deleteProduct($id);
        break;
        default:
            if(empty($id)){
                AddProduct();
            }else{
                EditProduct($id);
            }
        break;
    }
}

function deleteProduct($id) {
	$sql = "delete from gift_db where id = $id";
	execute($sql);
}

function addProduct() {
	$name = getPOST('name');
    $thumbnail = getPOST('thumbnail');
    $content = getPOST('content');
    $price = getPOST('price');
    $created_at = $updated_at = date('Y-m-d H:i:s');

	if(!empty($name)){
        $sql = "insert into gift_db(name,thumbnail,content,price,created_at,updated_at)
        values ('$name','$thumbnail','$content','$price','$created_at','$updated_at')";
        execute($sql);
    }
}
function EditProduct($id){
    $name = getPOST('name');
    $thumbnail = getPOST('thumbnail');
    $content = getPOST('content');
    $price = getPOST('price');
    $updated_at = date('Y-m-d H:i:s');
    if(!empty($name)){
        $sql = "update gift_db set name ='$name',thumbnail = '$thumbnail',content = '$content',price = '$price',updated_at = '$updated_at'
        where id = $id";
        execute($sql);
    }
}