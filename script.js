// Dark Mode Toggle Script
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Apply saved dark mode preference on load
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkModeToggle) darkModeToggle.checked = true;
}

// Mouse click listener for dark mode
if (darkModeToggle) {
  darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// Keyboard shortcut: toggle dark mode with "D"
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'd') {
    darkModeToggle.checked = !darkModeToggle.checked;
    darkModeToggle.dispatchEvent(new Event('change'));
  }
});

// Create high contrast toggle button
const highContrastToggle = document.createElement('button');
highContrastToggle.textContent = 'Toggle High Contrast (H)';
highContrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
highContrastToggle.setAttribute('id', 'high-contrast-toggle');

document.body.appendChild(highContrastToggle);

// Apply saved high contrast preference on load
if (localStorage.getItem('highContrast') === 'enabled') {
  document.body.classList.add('high-contrast');
}

// Mouse click listener for high contrast
highContrastToggle.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  const isHighContrast = document.body.classList.contains('high-contrast');
  localStorage.setItem('highContrast', isHighContrast ? 'enabled' : 'disabled');
});

// Keyboard shortcut: toggle high contrast with "H"
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'h') {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast ? 'enabled' : 'disabled');
  }
});

// Form Submit Handler
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const response = await fetch('https://formspree.io/f/mqabppgl', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    if (response.ok) {
      showToast();
      form.reset();
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  });
}

// Toast Notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 5000);
}