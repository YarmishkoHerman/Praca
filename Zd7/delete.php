<?php
// Відображення помилок PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$id = $_GET['id'];
$sql = "DELETE FROM users WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    header("Location: users.php");
    exit();
} else {
    echo "Помилка: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
