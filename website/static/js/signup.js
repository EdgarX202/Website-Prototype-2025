/*
    Handle the functionality of a sign up popup form.
    The form gathers user input and sends a POST request to the /signup endpoint.
    This is then stored in the database.
    Moreover, it processes JSON response, closes the popup form and displays a success or failure message.
*/

// Get references to HTML elements using IDs
const signupButton = document.getElementById('signup-button');
const signupPop = document.getElementById('signup-pop');
const closePop = document.getElementById('close-pop');
const cancelButton = document.getElementById('cancel-button');
const signupForm = document.getElementById('signup-form');

// Event listeners
signupButton.addEventListener('click', () => {
    signupPop.style.display = 'flex'; // Show the popup (none=hide)
});
closePop.addEventListener('click', () => {
    signupPop.style.display = 'none';
});
cancelButton.addEventListener('click', () => {
    signupPop.style.display = 'none';
});
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload (default form submission behaviour)

    // Get the values from the input fields
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // Send a POST request to /signup endpoint
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // Convert data to JSON string
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            city: city,
            country: country
        })
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => { // Display message - successful/error
        if (data.success) {
            alert('Account created successfully!');
            signupPop.style.display = 'none';
        } else {
            alert('Error creating account: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log errors to console
        alert('An error occurred. Please try again.');
    });
});

window.addEventListener('click', (event) => {
    if (event.target === signupPop) {
        signupPop.style.display = 'none';
    }
});