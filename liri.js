var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "cf2715e4f82c4353a62c3f91c87dc30f",
  secret: "371ce50a45a24d0db782f307ccb67be5"
});
var param =  require("./keys.js");
var client = param.twitterKeys;

function liriBot(){
	if(process.argv[2] === "my-tweets"){
	console.log(param.twitterKeys);
	var params = {liriForClass: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 	if (!error) {
    console.log(tweets);
  	}
	});
	} 
	else if(process.argv[2] === "spotify-this-song"){
		 song = "The+Sign+Ace";
		for (var i = 3; i < process.argv.length; i++){
			if(i > 3 && i < process.argv.length){
				song = "";
				song = song + "+" + process.argv[i];
		} else {
				song = "";
				song += process.argv[i];
			} 
		} 
		console.log(song);
		spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  		}
 		
		console.log("The Artist is: " + data.tracks.items[0].artists[0].name);
		console.log("The Song is: " + data.tracks.items[0].name);
		console.log("Listen to the preview: " + data.tracks.items[0].preview_url);
		console.log("The Album is " + data.tracks.items[0].album.name)
	});


	}
else if(process.argv[2] === "movie-this"){
	movieName = "";
	for (var i = 3; i < process.argv.length; i++) {
  	if (i > 3 && i < process.argv.length) {
    	movieName = movieName + "+" + process.argv[i];
 		 }
  	else {
    	movieName += process.argv[i];
  }
	}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
  // If the request is successful
  	if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB: " + JSON.parse(body).imdbRating);
    console.log("Country Produced: " + JSON.parse(body).Country);
   	console.log("Language: " + JSON.parse(body).Language);
   	console.log("Plot: " + JSON.parse(body).Plot);
   	console.log("Actors: " + JSON.parse(body).Actors);
   	console.log("Website: " + JSON.parse(body).Website);
  }
});
}
}
liriBot()
