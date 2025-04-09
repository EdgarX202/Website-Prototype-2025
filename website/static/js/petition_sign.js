
/*
    Handle signature button click event.
    Sends an AJAX post request to the server, register a signature, also update the count.
    Updates count if request is successful, otherwise show error message.
*/

$(document).ready(function() {
    $('#sign-button').click(function() {
        var petitionId = $(this).data('petition-id');

        // Initiate AJAX
        $.ajax({
            url: '/sign_petition/' + petitionId,
            type: 'POST',
            success: function(data) {
                if (data.signature_count !== undefined) {
                    $('#signature-count').text(data.signature_count);
                } else if (data.error) {
                    alert(data.error);
                }
            },
            error: function() {
                alert('Failed to sign the petition.');
            }
        });
    });
});