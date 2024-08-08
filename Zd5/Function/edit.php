<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbcon.php';

if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $firstName = trim($_POST['firstName']);
    $lastName = trim($_POST['lastName']);
    $email = trim($_POST['email']);
    $companyName = trim($_POST['companyName']);
    $address = trim($_POST['address']);
    $nip = trim($_POST['nip']);

    $errors = [];

    if (empty($firstName)) {
        $errors[] = 'Imię jest wymagane.';
    }
    if (empty($lastName)) {
        $errors[] = 'Nazwisko jest wymagane.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Nieprawidłowy adres e-mail.';
    }
    if (empty($companyName)) {
        $errors[] = 'Nazwa firmy jest wymagana.';
    }
    if (empty($address)) {
        $errors[] = 'Adres jest wymagany.';
    }
    if (!preg_match('/^\d{10}$/', $nip)) {
        $errors[] = 'NIP musi zawierać dokładnie 10 cyfr.';
    }

    if (empty($errors)) {
        $sql = "UPDATE users SET firstName=?, lastName=?, email=?, companyName=?, address=?, nip=? WHERE id=?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "ssssssi", $firstName, $lastName, $email, $companyName, $address, $nip, $id);
            if (mysqli_stmt_execute($stmt)) {
                header("Location: index.php");
                exit();
            } else {
                echo "Coś poszło nie tak. Spróbuj ponownie później.";
            }
            mysqli_stmt_close($stmt);
        }
    } else {
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM users WHERE id=?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $id);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_assoc($result);
                $firstName = $row['firstName'];
                $lastName = $row['lastName'];
                $email = $row['email'];
                $companyName = $row['companyName'];
                $address = $row['address'];
                $nip = $row['nip'];
            } else {
                echo "Nie znaleziono użytkownika.";
                exit();
            }
        }
        mysqli_stmt_close($stmt);
    }
} else {
    echo "Błędne żądanie.";
    exit();
}

mysqli_close($link);
?>

<form action="edit.php" method="post">
    <input type="hidden" name="id" value="<?php echo $id; ?>">
    <div>
        <label>Imię:</label>
        <input type="text" name="firstName" value="<?php echo $firstName; ?>">
    </div>
    <div>
        <label>Nazwisko:</label>
        <input type="text" name="lastName" value="<?php echo $lastName; ?>">
    </div>
    <div>
        <label>Adres e-mail:</label>
        <input type="text" name="email" value="<?php echo $email; ?>">
    </div>
    <div>
        <label>Nazwa firmy:</label>
        <input type="text" name="companyName" value="<?php echo $companyName; ?>">
    </div>
    <div>
        <label>Adres:</label>
        <input type="text" name="address" value="<?php echo $address; ?>">
    </div>
    <div>
        <label>NIP:</label>
        <input type="text" name="nip" value="<?php echo $nip; ?>">
    </div>
    <input type="submit" name="update" value="Update">
</form>
