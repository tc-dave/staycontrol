// Enable / Disable buttons
document.querySelectorAll('.btn.enable').forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    row.querySelector('.access').textContent = 'Enabled';
    row.querySelector('.access').classList.remove('disabled');
    row.querySelector('.access').classList.add('enabled');
    alert('Access enabled for this user.');
  });
});

document.querySelectorAll('.btn.disable').forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    row.querySelector('.access').textContent = 'Disabled';
    row.querySelector('.access').classList.remove('enabled');
    row.querySelector('.access').classList.add('disabled');
    alert('Access disabled for this user.');
  });
});

// Delete user button
document.querySelectorAll('.btn.delete').forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    if(confirm("Are you sure you want to delete this user?")) {
      row.remove();
      alert('User deleted successfully.');
    }
  });
});

// Notes are editable inline (contenteditable), no JS needed unless you want save function