$(document).ready(function(){

var mbArtistID = '6f6fd596-76e0-4b82-aa37-f558ac2d337b';
var mbReleaseID ='c3a13a4a-d6a0-42bf-9c24-b7a5a2b79718';
var mbArtistQuery = 'http://musicbrainz.org/ws/2/artist/' + mbArtistID + '?inc=aliases+tags+ratings&fmt=json';
var mbReleaseQuery = 'http://musicbrainz.org/ws/2/release/'+ mbReleaseID + '?inc=artist-rels+url-rels&fmt=json';

//send request

$.ajax({
            url: mbReleaseQuery,
            method: 'GET'
        })
        .done(function(mbrelease) {
            console.log(mbrelease);
            $('#mb-title').html('<h3>' + mbrelease.title);
        });

$.ajax({
            url: mbArtistQuery,
            method: 'GET'
        })
        .done(function(mbartist) {
            console.log(mbartist.tags);
            var tags = mbartist.tags;
            for (i=0; i<tags.length; i++) {
                $('#mb-tags').append("  " + tags[i].name);
            };
        });

});/*END Document Ready*/
