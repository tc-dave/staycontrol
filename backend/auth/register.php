<?php
// Show errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect to database
require_once "../config/db.php";

// Only handle POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request");
}

// Get form data safely
$username = trim($_POST["username"] ?? "");
$email    = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirm  = $_POST["confirm_password"] ?? "";

// Validate input
if ($username === "" || $email === "" || $password === "" || $confirm === "") {
    die("All fields are required");
}

if ($password !== $confirm) {
    die("Passwords do not match");
}

// Hash password securely
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare SQL (prevents SQL injection)
$stmt = $conn->prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
);

if (!$stmt) {
    die("Database error");
}

// Bind values
$stmt->bind_param("sss", $username, $email, $hashedPassword);

// Execute
if ($stmt->execute()) {
    echo "Registration successful";
} else {
    echo "Username or email already exists";
}

// Clean up
$stmt->close();
$conn->close();
?>