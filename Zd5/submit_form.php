<?php
$servername = "localhost";
$username = "root";
$password = "YRMgerman5354"; 
$dbname = "my_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $firstName = sanitizeInput($_POST["firstName"]);
    $lastName = sanitizeInput($_POST["lastName"]);
    $email = sanitizeInput($_POST["email"]);
    $password = sanitizeInput($_POST["password"]);
    $confirmPassword = sanitizeInput($_POST["confirmPassword"]);
    $companyName = sanitizeInput($_POST["companyName"]);
    $address = sanitizeInput($_POST["address"]);
    $nip = sanitizeInput($_POST["nip"]);

    // Validate input
    $errors = [];

    if (empty($firstName)) $errors[] = "Imię jest wymagane.";
    if (empty($lastName)) $errors[] = "Nazwisko jest wymagane.";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Podaj poprawny adres e-mail.";
    if (strlen($password) < 8) $errors[] = "Hasło musi mieć co najmniej 8 znaków.";
    if ($password !== $confirmPassword) $errors[] = "Hasła muszą być identyczne.";
    if (empty($companyName)) $errors[] = "Nazwa firmy jest wymagana.";
    if (empty($address)) $errors[] = "Adres jest wymagany.";
    if (!preg_match("/^\d{10}$/", $nip)) $errors[] = "NIP musi zawierać dokładnie 10 cyfr.";

    if (empty($errors)) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, password, companyName, address, nip) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $firstName, $lastName, $email, $hashedPassword, $companyName, $address, $nip);

        if ($stmt->execute()) {
            echo "Formularz został poprawnie przesłany.";
        } else {
            echo "Błąd: " . $stmt->error;
        }

        $stmt->close();
    } else {
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    }
}

$conn->close();
?>
