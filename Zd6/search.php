<?php
include 'db.php'; // Файл з підключенням до бази даних

$query = $_GET['query'];

// Очищення введеного користувачем запиту для безпеки
$searchTerm = $conn->real_escape_string($query);

// Запит до бази даних для пошуку терміну
$sql = "SELECT id, term, definition FROM terms WHERE term LIKE '%$searchTerm%' LIMIT 1";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Результати пошуку</title>
</head>
<body>
    <h1>Результати пошуку</h1>

    <?php
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<p><strong>Термін:</strong> " . $row['term'] . "</p>";
        echo "<p><strong>Визначення:</strong> " . $row['definition'] . "</p>";
        echo "<a href='edit.php?id=" . $row['id'] . "'>Редагувати</a>";
    } else {
        echo "<p>Термін не знайдено. Спробуйте ще раз.</p>";
    }
    ?>

    <a href="dit.html">Повернутися до пошуку</a>
</body>
</html>

<?php
$conn->close();
?>
