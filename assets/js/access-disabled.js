let contactInfo = {
  email: localStorage.getItem('accessDisabledEmail') || "support@staycontrol.com",
  phone: localStorage.getItem('accessDisabledPhone') || "+255 712 345 678"
};

function renderContactInfo() {
  document.getElementById('contact-email').textContent = contactInfo.email;
  document.getElementById('contact-phone').textContent = contactInfo.phone;
}

renderContactInfo();