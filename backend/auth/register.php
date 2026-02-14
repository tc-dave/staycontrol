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
        header("Location: ../../registration.html?error=empty");
        exit();
    }

    if ($password !== $confirm_password) {
        header("Location: ../../registration.html?error=password");
        exit();
    }

    // Check if email already exists
    $checkSql = "SELECT id FROM users WHERE email = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        header("Location: ../../registration.html?error=exists");
        exit();
    }

    $checkStmt->close();

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
        header("Location: ../../login.html?success=created");
        exit();
    } else {
        header("Location: ../../registration.html?error=server");
        exit();
    }

} else {
    echo "Invalid request";
}
?>