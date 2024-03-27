<?php
// get -> $_GET
// post -> $_POST
// get & post -> $_REQUEST
$fullname = $email = $password = "";
if(!empty($_POST)) {

	if(isset($_POST['fullname'])) {
		$fullname = $_POST['fullname'];
	}

	if(isset($_POST['email'])) {
		$email = $_POST['email'];
	}

	if(isset($_POST['pwd'])) {
		$password = $_POST['pwd'];
	}
	// echo '234234';

	//Build URL -> chuyen sang trang detail1.php -> GET => Hien thi du lieu trong bang
	// echo "$fullname : $email : $password";
	if($fullname == 'bomimi123' && $password == '123456') {
		header("Location: welcome.php?fullname=$fullname&email=$email&pwd=$password");

		die();
	}
}

if(!empty($_GET)) {
	if(isset($_GET['fullname'])) {
		$fullname = $_GET['fullname'];
	}

	if(isset($_GET['email'])) {
		$email = $_GET['email'];
	}

	if(isset($_GET['pwd'])) {
		$password = $_GET['pwd'];
	}
}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Register Form</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

	<style type="text/css">
		.form-group {
			margin-bottom: 20px;
		}
	</style>
</head>
<body>
<div class="container">
	<div class="card">
		<div class="card-header bg-info text-white">
			Register Form
		</div>
		<div class="card-body">
			<form method="post" >
				<div class="form-group">
					<label>Full Name: </label>
					<input required type="text" name="fullname" class="form-control" value="<?=$fullname?>">
				</div>
				<div class="form-group">
					<label>Email: </label>
					<input required type="email" name="email" class="form-control" value="<?=$email?>">
				</div>
				<div class="form-group">
					<label>Password: </label>
					<input required type="password" name="pwd" class="form-control" value="<?=$password?>">
				</div>
				<div class="form-group">
					<button class="btn btn-info text-white" type="submit">Register</button>
					<button class="btn btn-warning" type="reset">Reset</button>
				</div>
			</form>
		</div>
	</div>
</div>
</body>
</html>