const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const propertyType = document.getElementById('propertyType').value;

  if(password !== confirmPassword){
    alert("Passwords do not match!");
    return;
  }

  // Create user object
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({
    username,
    email,
    password,
    propertyType,
    role: null, // assigned later by Super Admin
    enabled: true
  });

  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful! Wait for admin approval.");
  form.reset();
});