$(document).ready(function () {
    // performSearchRequest();
    //GLOBAL VARIABLES
    var searchNoSpaces = '';
    var searchCriteria = '';
    var spotifyID = '';
    $(document).ajaxStart(function () {
        $('.load').show(); // show the gif image when ajax starts
    }).ajaxStop(function () {
        $('.load').hide(); // hide the gif image when ajax completes
    });
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
        var queryURL = 'https://api.spotify.com/v1/search?q=' + searchNoSpaces + '&type=' + searchCriteria + '&limit=1&market=ES';
        $.ajax({
            url: queryURL,
            method: 'GET',
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        }).done(function (response) {
            console.log('Spotify ID response: ' + response);
            if (searchCriteria === "artist") {
                //use artist endpoint 
                spotifyID = response.artists.items[0].id;
                artistTopTracks(spotifyID);
            } else if (searchCriteria === "track") {
                //use track endpoint
                spotifyID = response.tracks.items[0].id;
                performSearchRequest(spotifyID);
            } else if (searchCriteria === "album") {
                spotifyID = response.albums.items[0].id;
                albumTracks(spotifyID);
                //pull top songs from album endpoint
            } else {
                //could be just search song
            }
        });
    }
    //needs error message if no search results found or loading problem
    function artistTopTracks(spotifyID) {
        var artistTopTrackQuery = 'https://api.spotify.com/v1/artists/' + spotifyID + '/top-tracks?country=ES';
        $.ajax({
            url: artistTopTrackQuery,
            method: 'GET',
        }).done(function (response) {
            console.log(response);
            spotifyID = response.tracks[0].id;
            performSearchRequest(spotifyID);
        });
    }

    function albumTracks(spotifyID) {
        var albumTrackQuery = 'https://api.spotify.com/v1/albums/' + spotifyID + '/tracks?market=ES&limit=1';
        $.ajax({
            url: albumTrackQuery,
            method: 'GET',
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        }).done(function (response) {
            console.log(response);
            spotifyID = response.items[0].id;
            performSearchRequest(spotifyID);
        });
    }

    function performSearchRequest(trackID) {
        //was getTrackID();
        console.log('trackID of search: ' + trackID);
        var query = 'https://api.spotify.com/v1/tracks/' + trackID; //'2ctvdKmETyOzPb2GiJJT53'
        console.log(query);
        callAJAX(query);
    }

    function getTrackID() {
        return null;
    }

    function callAJAX(queryURL) {
        $.ajax({
            url: queryURL,
            method: 'GET',
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        }).done(function (response) {
            console.log(response);
            var uri = response.uri;
            createPlayWidget(uri);
        });
    }

    function createPlayWidget(id) {
        var iframePlayer = $('<iframe>');
        iframePlayer.attr('src', 'https://embed.spotify.com/track/' + id);
        // iframePlayer.appendTo('.player');
        $('.player').html(iframePlayer);
    }
});