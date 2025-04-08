

const signupButton = document.getElementById('signup-button');
const signupPop = document.getElementById('signup-pop');
const closePop = document.getElementById('close-pop');
const cancelButton = document.getElementById('cancel-button');
const signupForm = document.getElementById('signup-form');

signupButton.addEventListener('click', () => {
    signupPop.style.display = 'flex';
});

closePop.addEventListener('click', () => {
    signupPop.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
    signupPop.style.display = 'none';
});

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('lastName').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            city: city,
            country: country
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully!');
            signupPop.style.display = 'none';
        } else {
            alert('Error creating account: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});

window.addEventListener('click', (event) => {
    if (event.target === signupPop) {
        signupPop.style.display = 'none';
    }
});