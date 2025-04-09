/*
    Dynamic loading and displaying of petition signatures.
    Retrieves the petition ID and makes an AJAX request to fetch the signatures
    from the database, therefore, displaying them on a website.

    Incase of a failure, display the error message.
*/
$(document).ready(function() {
    $('.signatures-trigger').click(function() {
        var petitionId = $(this).data('petition-id');
        var signaturesList = $('#signatures-list-' + petitionId);

        // Initiate AJAX
        $.ajax({
            url: '/signatures/' + petitionId,
            type: 'GET',
            success: function(data) { // Execute if successful
                var signaturesH = '<h5>Signed By:</h5><ul>';
                $.each(data, function(index, signature) { // Iterate over the data array that holds signatures
                    signaturesH += '<li>' + signature.first_name + ' ' + signature.last_name + ' </li>';
                });
                signaturesH += '</ul>'; // Close the list
                signaturesList.html(signaturesH);
                signaturesList.slideToggle(); // Toggle visibility
            },
            error: function() { // Error message if load failed
                signaturesList.html('<p>Failed to load signatures.</p>');
                signaturesList.slideToggle();
            }
        });
    });
});