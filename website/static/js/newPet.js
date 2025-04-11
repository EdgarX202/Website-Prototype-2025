/*
    Handle the functionality for new petition popup form.
    The form gathers user input and sends a POST request to the /createPet endpoint.
    This is then stored in the database.
    Moreover, it processes JSON response, closes the popup form and displays a success or failure message.
*/

// Get references to HTML elements using IDs
const newPetButton = document.getElementById('new-pet-button');
const newPetPop = document.getElementById('new-pet-pop');
const closeNewPetPop = document.getElementById('close-new-pet-pop');
const cancelPetButton = document.getElementById('cancel-pet-button');
const newPetForm = document.getElementById('new-pet-form');

console.log("newPetButton:", newPetButton);

// Event listeners
newPetButton.addEventListener('click', () => {
    newPetPop.style.display = 'flex'; // Show the popup (none=hide)
});
closeNewPetPop.addEventListener('click', () => {
    newPetPop.style.display = 'none';
});
cancelPetButton.addEventListener('click', () => {
    newPetPop.style.display = 'none';
});
newPetForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload (default form submission behaviour)

    // Get the values from the input fields
    const title = document.getElementById('title').value;
    const goal = document.getElementById('goal').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    // Send a POST request to /signup endpoint
    fetch('/createPet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // Convert data to JSON string
            title: title,
            goal: goal,
            location: location,
            description: description,
            image: image
        })
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => { // Display message - successful/error
        if (data.success) {
            alert('Petition created successfully!');
            newPetPop.style.display = 'none';
        } else {
            alert('Error creating new petition: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log errors to console
        alert('An error occurred. Please try again.');
    });
});

window.addEventListener('click', (event) => {
    if (event.target === newPetPop) {
        newPetPop.style.display = 'none';
    }
});