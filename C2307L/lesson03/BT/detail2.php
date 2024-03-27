<?php
$fullname = $email = $password = "";
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
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>Full Name</th>
				<th>Email</th>
				<th>Password</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<?php
						echo $fullname;
					?>
				</td>
				<td>
					<?php
						print($email);
					?>
				</td>
				<td>
					<?=$password?>
					<a href="post.php?<?="fullname=$fullname&email=$email&pwd=$password"?>"><button class="btn btn-sm btn-warning">Edit</button></a>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</body>
</html>
