document.addEventListener("DOMContentLoaded", () => {

  // Password match validation
  const password = document.querySelector('input[name="password"]');
  const confirmPassword = document.querySelector('input[name="confirm_password"]');

  if (password && confirmPassword) {
    confirmPassword.addEventListener('input', () => {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match");
      } else {
        confirmPassword.setCustomValidity("");
      }
    });
  }

  // Error message from URL
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  const errorBox = document.getElementById("error-message");

  if (!errorBox) return;

  if (error === "exists") {
    errorBox.textContent = "You already have an account with this email.";
    errorBox.classList.add("show", "error");
  }

  if (error === "password") {
    errorBox.textContent = "Passwords do not match.";
    errorBox.classList.add("show", "error");
  }

  if (error === "empty") {
    errorBox.textContent = "All fields are required.";
    errorBox.classList.add("show", "error");
  }

  if (error === "server") {
    errorBox.textContent = "Something went wrong. Try again.";
    errorBox.classList.add("show", "error");
  }

});