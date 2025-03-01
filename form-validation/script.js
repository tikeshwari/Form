// Select form elements
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupPhone = document.getElementById('signupPhone');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const errorMessage = document.getElementById('errorMessage'); // For error messages
const alertMessage = document.getElementById('alertMessage'); // For alert messages

// Password Validation Function
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordPattern.test(password);
}

// Phone Number Validation Function
function validatePhoneNumber(phone) {
    const phonePattern = /^\+(\d{1,3})-(\d{10})$/; // Example: +91-9876543210
    return phonePattern.test(phone);
}

// Email Validation Function
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

// Function to check if the email is already registered
function isEmailRegistered(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

// Function to save user data to local storage
function saveUserData(email, password, phone) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password, phone });
    localStorage.setItem('users', JSON.stringify(users));
}

// Signup Form Submission Handler
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting

    const email = signupEmail.value;
    const password = signupPassword.value;
    const phone = signupPhone.value;

    if (!validateEmail(email)) {
        alertMessage.textContent = 'Please enter a valid email address.';
        alertMessage.style.color = 'red';
        return;
    }

    if (isEmailRegistered(email)) {
        alertMessage.textContent = 'Email is already registered!';
        alertMessage.style.color = 'red';
        return;
    }

    if (!validatePassword(password)) {
        alertMessage.textContent = 'Password must be between 8-16 characters, and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        alertMessage.style.color = 'red';
        return;
    }

    if (!validatePhoneNumber(phone)) {
        alertMessage.textContent = 'Please enter a valid phone number (e.g., +91-9876543210).';
        alertMessage.style.color = 'red';
        return;
    }

    // Save the user data to localStorage
    saveUserData(email, password, phone);
    alertMessage.textContent = 'Signup successful! You can now log in.';
    alertMessage.style.color = 'green';
    signupForm.reset(); // Reset the form fields
});

// Login Form Submission Handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting

    const email = loginEmail.value;
    const password = loginPassword.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        errorMessage.textContent = 'Invalid email or password.';
        errorMessage.style.color = 'red';
        return;
    }

    errorMessage.textContent = '';
    alert('Login successful! Welcome to your dashboard.');
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Optional: You can add a function to clear the localStorage on logout
function logout() {
    localStorage.clear();
    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to the homepage after logout
}
