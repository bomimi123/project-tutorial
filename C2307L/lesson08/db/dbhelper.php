<?php
require_once ('config.php');

define('HOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');
define('DBNAME', 'gift_db_2');



/**
 * Su dung cho lenh: insert/update/delete
 */
function createDB() {
	// Them du lieu vao database
	//B1. Mo ket noi toi database
	$conn = mysqli_connect(HOST, USERNAME, PASSWORD);
	//connect error
	if (mysqli_connect_errno()) {
		echo "database error > ".mysqli_connect_error();
		exit();
	}

	mysqli_set_charset($conn, 'utf8');

	//B2. Thuc hien truy van insert
	$sql = "create database if not exists ".DATABASE;
	mysqli_query($conn, $sql);

	//B3. Dong ket noi database
	mysqli_close($conn);
}

/**
 * Su dung cho lenh: insert/update/delete
 */
function execute($sql) {
	// Them du lieu vao database
	//B1. Mo ket noi toi database
	$conn = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);
	//connect error
	if (mysqli_connect_errno()) {
		echo "database error > ".mysqli_connect_error();
		exit();
	}
	mysqli_set_charset($conn, 'utf8');

	//B2. Thuc hien truy van insert
	mysqli_query($conn, $sql);

	//B3. Dong ket noi database
	mysqli_close($conn);
}

/**
 * Su dung cho lenh: select
 */
function executeResult($sql) {
	// Them du lieu vao database
	//B1. Mo ket noi toi database
	$conn = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);
	//connect error
	if (mysqli_connect_errno()) {
		echo "database error > ".mysqli_connect_error();
		exit();
	}

	mysqli_set_charset($conn, 'utf8');

	//B2. Thuc hien truy van insert
	$resultset = mysqli_query($conn, $sql);
	$data      = [];

	while (($row = mysqli_fetch_array($resultset, 1)) != null) {
		$data[] = $row;
	}

	//B3. Dong ket noi database
	mysqli_close($conn);

	return $data;
}