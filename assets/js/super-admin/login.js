const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

const SUPER_ADMIN_USERNAME = "admin";
const SUPER_ADMIN_PASSWORD = "123456";

form.addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username === SUPER_ADMIN_USERNAME && password === SUPER_ADMIN_PASSWORD){
    localStorage.setItem('superAdminLoggedIn', 'true');
    window.location.href = "settings.html";
  } else {
    errorMsg.textContent = "Incorrect username or password!";
  }
});