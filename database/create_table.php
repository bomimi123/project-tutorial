<?php
require_once('./connect_db.php');

    $sql = "CREATE TABLE cali_user (
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        birthday DATE,
        sex ENUM('Male', 'Female', 'Other'),
        email VARCHAR(255),
        phoneNumber VARCHAR(15),
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role TINYINT(1) DEFAULT 0
    )";

    if ($conn->query($sql) === TRUE ) {
        $sql_alter = "ALTER TABLE cali_user ADD COLUMN id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY";
        if ($conn->query($sql_alter) === TRUE) {
            echo "table cali_user created successfully";
        } else {
            echo "error creating table: " .$conn->error;
        }
    } else {
        echo "error creating table: " .$conn->error;
    }

    $conn->close();
?>
