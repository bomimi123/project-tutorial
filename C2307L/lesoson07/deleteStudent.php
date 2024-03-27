<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset ($post['delete'])) {
        $studentIdToDelete = $_POST['studentIdToDelete'];
        $sqlDelete = "DELETE FROM student WHERE id = $studentIdToDelete";
        
        if($conn->query($sqlDelete) === TRUE ) {
            header('Location:management.php');
            exit();
        } else{
            echo "Loi khi xoa sinh vien " . $conn->error; 
        }
     }
?>
