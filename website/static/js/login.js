$(document).ready(function() {
    $('#login').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        $.ajax({
            url: '/', // Current route
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#login-section').html('<p>Welcome, ' + response.email + '! <a href="/logout">Logout</a></p>'); //corrected logout url
                } else {
                    $('#error-message').text(response.error);
                }
            },
            error: function(error) {
                $('#error-message').text('An error occurred.');
            }
        });
    });
});