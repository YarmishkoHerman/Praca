<?php
// Відображення помилок PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id='$id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    echo "Користувача не знайдено";
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Редагування користувача</title>
</head>
<body>
    <h1>Редагування користувача</h1>
    <form action="update.php" method="POST">
        <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
        <label for="firstName">Ім'я:</label>
        <input type="text" id="firstName" name="firstName" value="<?php echo $row['firstName']; ?>" required><br><br>
        
        <label for="lastName">Прізвище:</label>
        <input type="text" id="lastName" name="lastName" value="<?php echo $row['lastName']; ?>" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="<?php echo $row['email']; ?>" required><br><br>
        
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" value="<?php echo $row['password']; ?>" required><br><br>
        
        <label for="companyName">Назва компанії:</label>
        <input type="text" id="companyName" name="companyName" value="<?php echo $row['companyName']; ?>" required><br><br>
        
        <label for="address">Адреса:</label>
        <input type="text" id="address" name="address" value="<?php echo $row['address']; ?>" required><br><br>
        
        <label for="nip">NIP:</label>
        <input type="text" id="nip" name="nip" value="<?php echo $row['nip']; ?>" required><br><br>
        
        <input type="submit" value="Оновити">
    </form>
    <a href="users.php">Список користувачів</a>
</body>
</html>
