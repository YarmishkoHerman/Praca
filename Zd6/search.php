<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$query = $_GET['query'];

$searchTerm = $conn->real_escape_string($query);

$sql = "SELECT id, term, definition FROM terms WHERE term LIKE '%$searchTerm%' LIMIT 1";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Result search</title>
</head>
<body>
    <h1>Result</h1>

    <?php
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<p><strong>Term:</strong> " . $row['term'] . "</p>";
        echo "<p><strong>Definition:</strong> " . $row['definition'] . "</p>";
        echo "<a href='edit.php?id=" . $row['id'] . "'>Edit</a>";
    } else {
        echo "<p>Term not found. Try again.</p>";
    }
    ?>

    <a href="dit.html">Back to search</a>
</body>
</html>

<?php
$conn->close();
?>
