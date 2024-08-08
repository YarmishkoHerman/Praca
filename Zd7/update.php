<?php
// Відображення помилок PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$id = $_POST['id'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);
$companyName = $_POST['companyName'];
$address = $_POST['address'];
$nip = $_POST['nip'];

$sql = "UPDATE users SET firstName='$firstName', lastName='$lastName', email='$email', password='$password', companyName='$companyName', address='$address', nip='$nip' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    header("Location: users.php");
    exit();
} else {
    echo "Помилка: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
