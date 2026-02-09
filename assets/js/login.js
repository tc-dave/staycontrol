const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if(!user){
    errorMsg.textContent = "Invalid username or password";
    return;
  }

  if(!user.enabled){
    alert("Your account is disabled. Contact admin for access.");
    return;
  }

  // Save logged-in user
  localStorage.setItem('currentUser', JSON.stringify(user));

  // Redirect based on property type
  if(user.propertyType === "hotel") window.location.href = "hotel-dashboard.html";
  else if(user.propertyType === "apartment") window.location.href = "apartment-dashboard.html";
  else window.location.href = "property-type.html"; // both
});