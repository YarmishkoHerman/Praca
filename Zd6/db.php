<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "wyz";

// Tworzenie połączenia
$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdzenie połączenia
if ($conn->connect_error) {
    die("Połączenie nieudane: " . $conn->connect_error);
}
?>
