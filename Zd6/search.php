<?php
include 'db.php'; 

$query = $_GET['query'];

$searchTerm = $conn->real_escape_string($query);

$sql = "SELECT definition FROM terms WHERE term LIKE '%$searchTerm%' LIMIT 1";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Result</title>
</head>
<body>
    <h1>Result</h1>

    <?php
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<p><strong>Term:</strong> " . $row['definition'] . "</p>";
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