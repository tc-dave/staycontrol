document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const error = params.get("error");

    const notification = document.getElementById("notification");
    if (!notification) return;

    if (success === "created") {
        notification.textContent = "✅ Account successfully created! You can now login.";
        notification.classList.add("show", "success");
    }

    if (error === "empty") {
        notification.textContent = "⚠️ All fields are required.";
        notification.classList.add("show", "error");
    }

    if (error === "invalid") {
        notification.textContent = "❌ Invalid login details.";
        notification.classList.add("show", "error");
    }

    if (success || error) {
        setTimeout(() => {
            notification.classList.remove("show");
        }, 5000);
    }

});