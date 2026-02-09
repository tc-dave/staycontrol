// Load contact info from localStorage
let contactEmail = localStorage.getItem('accessDisabledEmail') || "support@staycontrol.com";
let contactPhone = localStorage.getItem('accessDisabledPhone') || "+255 712 345 678";

// Set content
document.getElementById('home-email').textContent = contactEmail;
document.getElementById('home-phone').textContent = contactPhone;