const dismissButton = document.getElementById('dismiss-btn');       // The button you click to dismiss the success message
const successMessage = document.getElementById('success-message');  // The success message view
const signUpForm = document.getElementById('sign-up');              // The sign up form view
const form = document.getElementById('form');                       // The form element (I gave it an id to select it faster)
const errorMessage = document.getElementById('error-message');      // The error message that appears when the email is invalid
const emailInput = document.getElementById('email');                // The email input field
const yourEmail = document.getElementById('your-email');            // The email that the user entered to use it in the success message
const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;             // The regex pattern to validate the email

function initialize() {
    // Reset the form and show the sign up form and hide the success message (if it was shown)

    signUpForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
    form.reset();
}

function showSuccessMessage() {
    // Hide the sign up form and show the success message

    signUpForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
}

function validate(email) {
    // Validate the email and return an object with the validation result and the error message

    if (!email) {
        return { validated: false, error: 'Email is required' };
    }
    if (!validEmailPattern.test(email)) {
        return { validated: false, error: 'Invalide email' };
    }
    return { validated: true, error: '' };
}

// run initialize function when dismiss button is clicked
dismissButton.addEventListener('click', initialize);

// handle the form submission
form.onsubmit = (e) => {
    e.preventDefault();
    const { email } = Object.fromEntries(new FormData(form).entries());

    const { validated, error } = validate(email);
    if (validated) {
        showSuccessMessage();
        yourEmail.textContent = email;
    }
    errorMessage.textContent = error;
    emailInput.classList.toggle('error', !validated);
};

// run the initialize function when the page loads
// Note: all of the above code are just assigning event listeners and functions to variables
// they will not run until they are called, this function is the only one that will run when the page loads
// because it is called '()'
initialize();
