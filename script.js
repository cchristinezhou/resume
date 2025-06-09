// Dark Mode Toggle Script
const toggle = document.getElementById('dark-mode-toggle');

// Check localStorage on page load
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (toggle) {
    toggle.checked = true;
  }
}

if (toggle) {
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// Form Submit Handler
const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch('https://formspree.io/f/mqabppgl', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  });

  if (response.ok) {
    showToast();
    form.reset(); // Clear the form
  } else {
    alert('Oops! There was a problem submitting your form.');
  }
});

// Toast Notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 5000); // 5 seconds
}