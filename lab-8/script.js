function validateForm() {
    var fname = sanitizeInput(document.getElementById('fname').value);
    var lname = sanitizeInput(document.getElementById('lname').value);
    var email = sanitizeInput(document.getElementById('email').value);
    var password = sanitizeInput(document.getElementById('password').value);
    var confirmPassword = sanitizeInput(document.getElementById('confirmPassword').value);

    // Clear previous messages
    clearMessages();

    // Check for empty fields
    if (fname === "" || lname === "" || email === "" || password === "" || confirmPassword === "") {
        showErrorMessage("All fields must be filled out.");
        return false;  // Prevent form submission if any field is empty
    }

    // Email format validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        showErrorMessage("Please enter a valid email address.");
        return false;  // Prevent form submission if the email format is invalid
    }

    // Password and confirm password match check
    if (password !== confirmPassword) {
        showErrorMessage("Passwords do not match.");
        return false;  // Prevent form submission if passwords don't match
    }

    // If all validations pass, show success message
    showSuccessMessage();

    return false;  // Prevent form submission for demonstration purposes (remove in production)
}

// Function to show the success message with animation
function showSuccessMessage() {
    var form = document.getElementById("registrationForm");
    var successMessage = document.createElement("div");
    successMessage.innerHTML = "Form Successfully Submitted!";
    successMessage.classList.add("success-message");

    form.appendChild(successMessage);  // Add the success message to the form

    // Make the success message disappear after 5 seconds
    setTimeout(function() {
        successMessage.style.display = 'none';
        resetForm();  // Reset the form after the success message disappears
    }, 5000);  // 5000ms = 5 seconds
}

// Function to show the error message with animation
function showErrorMessage(message) {
    var form = document.getElementById("registrationForm");
    var errorMessage = document.createElement("div");
    errorMessage.innerHTML = message;
    errorMessage.classList.add("error-message");

    form.appendChild(errorMessage);  // Add the error message to the form
}

// Function to clear previous messages
function clearMessages() {
    var successMessage = document.querySelector(".success-message");
    var errorMessage = document.querySelector(".error-message");
    if (successMessage) {
        successMessage.remove();
    }
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Function to reset the form fields after success
function resetForm() {
    document.getElementById('registrationForm').reset();  // Reset form fields
}

// Function to sanitize user input to prevent XSS
function sanitizeInput(input) {
    var element = document.createElement('div');
    if (input) {
        element.innerText = input;  // Convert input to plain text, removing any tags
        return element.innerHTML;   // Return the sanitized string
    }
    return '';
}

// Function to escape special characters for HTML display
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}
