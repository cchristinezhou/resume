/**
 * Dark Mode toggle checkbox element
 * @type {HTMLInputElement|null}
 */
const darkModeToggle = document.getElementById('dark-mode-toggle');

/**
 * Apply saved dark mode preference from localStorage
 */
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkModeToggle) darkModeToggle.checked = true;
}

/**
 * Toggle dark mode when checkbox is changed (mouse interaction)
 */
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

/**
 * Toggle dark mode using keyboard shortcut ("D" key)
 * @param {KeyboardEvent} e
 */
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'd') {
    darkModeToggle.checked = !darkModeToggle.checked;
    darkModeToggle.dispatchEvent(new Event('change'));
  }
});

/**
 * High contrast toggle button element
 * @type {HTMLButtonElement}
 */
const highContrastToggle = document.createElement('button');
highContrastToggle.textContent = 'Toggle High Contrast (H)';
highContrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
highContrastToggle.setAttribute('id', 'high-contrast-toggle');

document.body.appendChild(highContrastToggle);

/**
 * Apply saved high contrast preference from localStorage
 */
if (localStorage.getItem('highContrast') === 'enabled') {
  document.body.classList.add('high-contrast');
}

/**
 * Toggle high contrast mode using mouse click
 */
highContrastToggle.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  const isHighContrast = document.body.classList.contains('high-contrast');
  localStorage.setItem('highContrast', isHighContrast ? 'enabled' : 'disabled');
});

/**
 * Toggle high contrast mode using keyboard shortcut ("H" key)
 * @param {KeyboardEvent} e
 */
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'h') {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast ? 'enabled' : 'disabled');
  }
});

/**
 * Form element on contact page
 * @type {HTMLFormElement|null}
 */
const form = document.getElementById('contact-form');

/**
 * Handles contact form submission
 * @param {SubmitEvent} e
 */
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

/**
 * Displays a toast notification at the bottom of the screen
 */
function showToast() {
  const toast = document.getElementById('toast');
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 5000);
}