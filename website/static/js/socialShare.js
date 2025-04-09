/*
    Function for sharing petition to x and facebook social media.
    Gets the data attributes from html file and creates a sharing URL which is executed in a new window.
*/

function sharePetition(platform, element) {
    // Variables - for getting data attributes from html file
    var title = element.getAttribute('data-title');
    var url = element.getAttribute('data-url');
    var shareUrl = ''; // An empty string for URL

    // Check which platform it is create a shareable link
    if(platform === 'facebook') {
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    } else if (platform === 'x') {
        shareUrl = 'https://www.x.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url);
    }

    // Open a new window
    window.open(shareUrl, '_blank', 'width=1000,height=800');
}