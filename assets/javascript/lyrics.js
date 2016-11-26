$(document).ready(function(){

var track = '15953433';
var lyricsKey = '19dd9fef543fa2b41934607c6f39eeca';
//Below returns 404 Not Found
var lyricsKwery = 'http://api.musixmatch.com/ws/v1.1/track.get?apikey=' + lyricsKey;
//below returns 401 error Unauthorized'
var lyricsQuery = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=' + lyricsKey + '?format=jsonp&callback=callback&track_id=' + track;
//below query returns 401 error Unauthorized
var lQuery = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=15953433';

//send request

$.ajax({
            url: lyricsQuery,
            method: 'GET'
        })
        .done(function(response) {
        	//console logging this reminded that I'm currently not authorized
            console.log(response);
        });

//create dummy data using a model of their response object
var song = {"message": {
		    "header": {
		      "status_code": 0,
		      "execute_time": 0
		    },
		    "body": {
		      "lyrics": {
		        "instrumental": 0,
		        "pixel_tracking_url": "string",
		        "publisher_list": [
		          "string"
		        ],
		        "lyrics_language_description": "string",
		        "restricted": 0,
		        "updated_time": "string",
		        "explicit": 0,
		        "lyrics_copyright": "string",
		        "html_tracking_url": "string",
		        "lyrics_language": "string",
		        "script_tracking_url": "string",
		        "verified": 0,
		        "lyrics_body": "Now and then I think of when we were together\r\
					<br>Like when you said you felt so happy you could die\r\
					<br>Told myself that you were right for me\r\
					<br>But felt so lonely in your company\r\
					<br>But that was love and it's an ache I still remember\r\
					<br>You can get addicted to a certain kind of sadness\r\
					<br>Like resignation to the end, always the end\r\
					<br>So when we found that we could not make sense\r\
					<br>Well you said that we would still be friends\r\
					<br>But I'll admit that I was glad that it was over\r\
					<br>But you didn't have to cut me off\r\
					<br>Make out like it never happened and that we were nothing\r\
					<br>And I don't even need your love\r\
					<br>But you treat me like a stranger and that feels so rough\r\
					<br>No you didn't have to stoop so low\r\
					<br>Have your friends collect your records and then change your number\r\
					<br>I guess that I don't need that though\r\
					<br>Now you're just somebody that I used to know\r\
					<br>Now you're just somebody that I used to know\r\
					<br>Now you're just somebody that I used to know\r\
					<br>Now and then I think of all the times you screwed me over\r\
					<br>But had me believing it was always something that I'd done\r\
					<br>And I don't wanna live that way\r\
					<br>Reading into every word you say\r\
					<br>You said that you could let it go\r\
					<br>And I wouldn't catch you hung up on somebody that you used to know\r\
					<br>But you didn't have to cut me off\r\
					<br>Make out like it never happened and that we were nothing\r\
					<br>And I don't even need your love\r\
					<br>But you treat me like a stranger and that feels so rough\r\
					<br>No you didn't have to stoop so low\r\
					<br>Have your friends collect your records and then change your number\r\
					<br>I guess that I don't need that though\r\
					<br>Now you're just somebody that I used to know\r\
					<br>Somebody, I used to know\r\
					<br>(Somebody) Now you're just somebody that I used to know\r\
					<br>Somebody, I used to know\r\
					(Somebody) Now you're just somebody that I used to know\r\
					I used to know, that I used to know, I used to know somebody",
		        "lyrics_id": 0,
		        "writer_list": [
		          "string"
		        ],
		        "can_edit": 0,
		        "action_requested": "string",
		        "locked": 0
			      }
			    }
			  }
			};
//display response in div
$('#lyrics').html(song.message.body.lyrics.lyrics_body);

});/*END Document Ready*/
