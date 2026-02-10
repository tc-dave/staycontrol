<?php
// Show errors (development only)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request");
}

// Get input
$username = trim($_POST["username"] ?? "");
$password = $_POST["password"] ?? "";

// Validate
if ($username === "" || $password === "") {
    die("All fields are required");
}

// Get user from DB
$stmt = $conn->prepare(
    "SELECT id, username, password, role, status FROM users WHERE username = ? OR email = ?"
);

$stmt->bind_param("ss", $username, $username);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    die("Invalid login details");
}

$user = $result->fetch_assoc();

// Check password
if (!password_verify($password, $user["password"])) {
    die("Invalid login details");
}

// Check if account is disabled
if ($user["status"] === "disabled") {
    header("Location: ../../access-disabled.html");
    exit;
}

// Login success → set session
$_SESSION["user_id"] = $user["id"];
$_SESSION["username"] = $user["username"];
$_SESSION["role"] = $user["role"];

// Redirect by role
if ($user["role"] === "super_admin") {
    header("Location: ../../super-admin/dashboard.html");
} elseif ($user["role"] === "admin") {
    header("Location: ../../dashboard/admin.html");
} else {
    header("Location: ../../dashboard/user.html");
}

exit;