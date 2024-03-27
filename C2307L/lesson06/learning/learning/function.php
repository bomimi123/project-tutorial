<?php
function redirectTo($location) {
    header("Location: $location");
    exit;
}

function displayError($message) {
    echo "<div class='alert alert-danger' role='alert'>$message</div>";
}

function displaySuccess($message) {
    echo "<div class='alert alert-success' role='alert'>$message</div>";
}
?>
