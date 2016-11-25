$(document).ready(function(){
    performSearchRequest();


    function performSearchRequest() {
        var trackID = getTrackID();
        var query = 'https://api.spotify.com/v1/tracks/' + '2ctvdKmETyOzPb2GiJJT53';
        callAJAX(query);
    }

    function getTrackID() {
        return null;
    }

    function callAJAX(queryURL) {
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(function(response) {
            console.log(response);
            var uri = response.uri;
            createPlayWidget(uri);
        });
    }

    function createPlayWidget(id) {
        var iframePlayer = $('<iframe>');
        iframePlayer.attr(
            'src',
            'https://embed.spotify.com/track/' + id);
        iframePlayer.appendTo('.player');
    }
});