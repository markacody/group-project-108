$(document).ready(function () {
    performSearchRequest();
    //GLOBAL VARIABLES
    var searchNoSpaces = '';
    var searchCriteria = '';
    var spotifyID = '';
    //SEARCH BAR API QUERY and INTERACTION =========
    $('#mainsearch').on('click', function () {
        searchTerm = $('.searchinput').val().trim();
        searchNoSpaces = searchTerm.replace(/ /gi, '+');
        console.log(searchNoSpaces);
        searchCriteria = $("#myDropdown option:selected").text();
        console.log(searchCriteria);
        searchForSpotifyID(searchNoSpaces, searchCriteria);
        return false;
    });

    function searchForSpotifyID(searchNoSpaces, searchCriteria) {
        var queryURL = 'https://api.spotify.com/v1/search?q=' + searchNoSpaces + '&type=' + searchCriteria + '&limit=1';
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log('Spotify ID response: ' + response);
            if (searchCriteria === "artist") {
                //use artist endpoint 
                spotifyID = response.artists.items[0].id;
            } else if (searchCriteria === "track") {
                //use track endpoint
                spotifyID = response.tracks.items[0].id;
            } else if (searchCriteria === "album") {
                spotifyID = response.albums.items[0].id;
                //pull first 5 songs from album endpoint
                // /albums
            } else {
                //could be just search song
            }
        });
    }
    //needs error message if no search results found or loading problem
    function performSearchRequest() {
        var trackID = getTrackID(); //currently searchForSpotify ID
        var query = 'https://api.spotify.com/v1/tracks/' + '2ctvdKmETyOzPb2GiJJT53'; //replace with spotifyID
        callAJAX(query);
    }

    function getTrackID() {
        return null;
    }

    function callAJAX(queryURL) {
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(function (response) {
            console.log(response);
            var uri = response.uri;
            createPlayWidget(uri);
        });
    }

    function createPlayWidget(id) {
        var iframePlayer = $('<iframe>');
        iframePlayer.attr('src', 'https://embed.spotify.com/track/' + id);
        iframePlayer.appendTo('.player');
    }
});