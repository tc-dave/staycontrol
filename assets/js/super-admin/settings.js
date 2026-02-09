// Protect page if not logged in
if(localStorage.getItem('superAdminLoggedIn') !== 'true'){
  window.location.href = "admin-login.html";
}

// References
const form = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Load existing info from localStorage
emailInput.value = localStorage.getItem('accessDisabledEmail') || "support@staycontrol.com";
phoneInput.value = localStorage.getItem('accessDisabledPhone') || "+255 712 345 678";

// Save updated info
form.addEventListener('submit', function(e){
  e.preventDefault();

  const newEmail = emailInput.value;
  const newPhone = phoneInput.value;

  localStorage.setItem('accessDisabledEmail', newEmail);
  localStorage.setItem('accessDisabledPhone', newPhone);

  alert("Contact info updated successfully!");
});