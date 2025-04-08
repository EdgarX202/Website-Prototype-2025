/*
    Handles login functionality using AJAX.
    It sends the POST request to the server's root url "/", serialising the form data.
    If a user exists in the database, the login form will change into a welcome message.
*/

$(document).ready(function() {
    $('#login').submit(function(event) { // Is triggered when the form is submitted
        event.preventDefault(); // Prevent page reload, allow AJAX to handle submission

        // Initiate AJAX
        $.ajax({
            url: '/', // Current route
            type: 'POST',
            data: $(this).serialize(), // Serialise data into a query string
            dataType: 'json',
            success: function(response) { // Execute if AJAX request is successful. Data returned to the server
                if (response.success) {
                // If successful, update the content with the following - display welcome message
                    $('#login-section').html('<p>Welcome, ' + response.email + '! <a href="/logout">Logout</a></p>');
                } else {
                // Otherwise it's a failure, display error message
                    $('#error-message').text(response.error);
                }
            },
            // Display when error occurs
            error: function(error) {
                $('#error-message').text('An error occurred.');
            }
        });
    });
});