<?php
// Відображення помилок PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Список користувачів</title>
</head>
<body>
    <h1>Список користувачів</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Email</th>
            <th>Пароль</th>
            <th>Назва компанії</th>
            <th>Адреса</th>
            <th>NIP</th>
            <th>Дії</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>" . $row["id"]. "</td>
                        <td>" . $row["firstName"]. "</td>
                        <td>" . $row["lastName"]. "</td>
                        <td>" . $row["email"]. "</td>
                        <td>" . $row["password"]. "</td>
                        <td>" . $row["companyName"]. "</td>
                        <td>" . $row["address"]. "</td>
                        <td>" . $row["nip"]. "</td>
                        <td>
                            <a href='edit.php?id=" . $row["id"]. "'>Редагувати</a> |
                            <a href='delete.php?id=" . $row["id"]. "'>Видалити</a>
                        </td>
                    </tr>";
            }
        } else {
            echo "<tr><td colspan='9'>0 results</td></tr>";
        }
        $conn->close();
        ?>
    </table>
</body>
</html>
