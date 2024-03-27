<?php
require_once ('config.php');

//insert, update, deletae
function execute($sql, $params = []) {
    $conn = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);
    mysqli_set_charset($conn, 'utf8');

    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt === false) {
        die("Prepare failed: " . mysqli_error($conn));
    }

    if (!empty($params)) {
        // Dynamically bind parameters based on their types
        $types = str_repeat('s', count($params));
        mysqli_stmt_bind_param($stmt, $types, ...$params);
    }

    $result = mysqli_stmt_execute($stmt);

    if ($result === false) {
        die("Execute failed: " . mysqli_stmt_error($stmt));
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}


//Doi voi bai toan muon lay du lieu
function executeResult($sql) {
    $conn = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);
    mysqli_set_charset($conn, 'utf8');

    $data = [];
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        // If there's an error in the query, handle it
        echo 'Error: ' . mysqli_error($conn);
        mysqli_close($conn);
        return $data; // or handle the error in a different way as per your requirement
    }

    while (($row = mysqli_fetch_array($result, 1)) != null) {
        $data[] = $row;
    }

    mysqli_free_result($result); // Free the result set
    mysqli_close($conn);

    return $data;
}


function removeSpecialCharacter($str) {
	$str = str_replace('\\', '\\\\', $str);
	$str = str_replace('\'', '\\\'', $str);
	return $str;
}

function getPOST($key) {
	$value = '';
	if (isset($_POST[$key])) {
		$value = $_POST[$key];
	}
	return removeSpecialCharacter($value);
}