<?php
include 'db.php'; 

$id = $_GET['id'];

// Query to get the current term and define it
$sql = "SELECT term, definition FROM terms WHERE id=$id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    die("Term not found");
}

// Update term and definition
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $term = $conn->real_escape_string($_POST['term']);
    $definition = $conn->real_escape_string($_POST['definition']);

    $update_sql = "UPDATE terms SET term='$term', definition='$definition' WHERE id=$id";
    
    if ($conn->query($update_sql) === TRUE) {
        echo "Term updated successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit terms</title>
</head>
<body>
    <h1>Edit</h1>
    <form method="POST" action="">
        <label for="term">Term:</label>
        <input type="text" id="term" name="term" value="<?php echo $row['term']; ?>" required>
        <br>
        <label for="definition">Definition:</label>
        <textarea id="definition" name="definition" required><?php echo $row['definition']; ?></textarea>
        <br>
        <input type="submit" value="Update">
    </form>
    <a href="dit.html">Back to search</a>
</body>
</html>

<?php
$conn->close();
?>
