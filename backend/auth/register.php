<?php
require_once("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = trim($_POST["fullname"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);
    $property_type = trim($_POST["property_type"]);

    if (
        empty($username) ||
        empty($email) ||
        empty($password) ||
        empty($confirm_password) ||
        empty($property_type)
    ) {
        die("All fields are required");
    }

    if ($password !== $confirm_password) {
        die("Passwords do not match");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $role = NULL;
    $enabled = 1;

    $sql = "INSERT INTO users 
    (username, email, password, property_type, role, enabled, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi",
        $username,
        $email,
        $hashedPassword,
        $property_type,
        $role,
        $enabled
    );

    if ($stmt->execute()) {
        header("Location: ../../login.html?registered=success");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();

} else {
    echo "Invalid request";
}
?>