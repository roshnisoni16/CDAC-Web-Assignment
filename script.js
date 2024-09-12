document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const formError = document.getElementById('formError');
  const spinner = document.getElementById('spinner');
  const apiMessage = document.getElementById('apiMessage'); // Define apiMessage

  // Reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  formError.textContent = '';
  apiMessage.textContent = ''; // Reset the success/failure message

  // Basic validations
  if (!validateEmail(email)) {
    emailError.textContent = 'Please enter a valid email.';
    return;
  }
  if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    return;
  }

  // Show loading spinner
  spinner.style.display = 'block';

  // Simulate API call
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,
      password: password
    }),
  })
  .then(response => response.json())
  .then(data => {
    // Hide spinner
    spinner.style.display = 'none';

    // Simulate a successful login response
    apiMessage.textContent = 'Login successful!';
    apiMessage.style.color = 'darkgreen';
  })
  .catch(error => {
    spinner.style.display = 'none';
    apiMessage.textContent = 'Login failed. Please try again.';
    apiMessage.style.color = 'darkred';
  });
});

// Function to validate email
function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(String(email).toLowerCase());
}

// Get form and email input elements
const emailInput = document.getElementById("email");

// Listen for form submission and store email in localStorage
document.getElementById("loginForm").addEventListener("submit", function (event) {
event.preventDefault();

const email = emailInput.value;

// Store the email in local storage
localStorage.setItem("userEmail", email);

console.log("Email saved in local storage:", email);
});

// Pre-fill email input if email exists in local storage
const savedEmail = localStorage.getItem("userEmail");
if (savedEmail) {
console.log("Stored Email:", savedEmail);
emailInput.value = savedEmail; // Prefill the email input
}

// Show/Hide password functionality
document.getElementById('showPassword').addEventListener('change', function() {
const passwordField = document.getElementById('password');
passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});
