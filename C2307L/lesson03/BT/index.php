<?php
if(!empty($_GET)) {
	$fullname = $email = $password = "";

	if(isset($_GET['fullname'])) {
		$fullname = $_GET['fullname'];
	}

	if(isset($_GET['email'])) {
		$email = $_GET['email'];
	}

	if(isset($_GET['pwd'])) {
		$password = $_GET['pwd'];
	}

	echo "$fullname : $email : $password";

	die();
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
			<form method="get">
				<div class="form-group">
					<label>Full Name: </label>
					<input required type="text" name="fullname" class="form-control">
				</div>
				<div class="form-group">
					<label>Email: </label>
					<input required type="email" name="email" class="form-control">
				</div>
				<div class="form-group">
					<label>Password: </label>
					<input required type="password" name="pwd" class="form-control">
				</div>
				<div class="form-group">
					<button class="btn btn-info text-white" type="submit">Register</button>
					<a href="index.php"><button class="btn btn-warning" type="button">Reset</button></a>
				</div>
			</form>
		</div>
	</div>
</div>
</body>
</html>