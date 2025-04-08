
$(document).ready(function() {
    $('.signatures-trigger').click(function() {
        var petitionId = $(this).data('petition-id');
        var signaturesList = $('#signatures-list-' + petitionId);

        $.ajax({
            url: '/signatures/' + petitionId,
            type: 'GET',
            success: function(data) {
                var signaturesH = '<h4>Signed By:</h4><ul>';
                $.each(data, function(index, signature) {
                    signaturesH += '<li>' + signature.first_name + ' ' + signature.last_name + ' </li>';
                });
                signaturesH += '</ul>';
                signaturesList.html(signaturesH);
                signaturesList.slideToggle();
            },
            error: function() {
                signaturesList.html('<p>Failed to load signatures.</p>');
                signaturesList.slideToggle();
            }
        });
    });
});