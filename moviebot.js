/* Node.js */

/*
groupme_token="f80cc46006ca01352bfd07722314ca56";
group_id="30555241"
group_name="MovieChat";
bot_id="dd48f9623940e77715a0874f5a"
*/

var https = require("https");

var bot_id = "dd48f9623940e77715a0874f5a"

function respond() {
	var request = JSON.parse(this.request.body[0]),
		regex = new RegExp('movie', 'MOVIE', 'Movie');

	if(request.text && regex.test(request.text)) {
		this.response.writeHead(200);
		postMovies(getMovies());
		this.response.end();
	} else {
		this.response.writeHead(200);
		this.response.end();
	}
}

function getMovies() {
	return "hi"
}

function postMovies(movies) {
	var options, body, request;

	options = {
		hostname: 'https://groupme-movie-bot.herokuapp.com/',
		path: '/v3/bots/post',
		method: 'POST'
	};

	body = {
		"bot_id" : 'dd48f9623940e77715a0874f5a',
		"text" : movies
	}

	request = HTTPS.request(options, function(response) {
		if(response.statusCode == 202) {
       	 //neat
      	} else {
        	console.log('rejecting bad status code ' + response.statusCode);
      	}
	});

	request.on('error', function(err) {
    	console.log('error:' + JSON.stringify(err));
  	});
  	request.on('timeout', function(err) {
	    console.log('timeout: ' + JSON.stringify(err));
  	});
	request.end(JSON.stringify(body));
}

exports.respond = respond;
// var xhr = new XMLHttpRequest();



// curl -X POST -d '{"bot": { "name": "MovieBot", "group_id": "30555241", "callback_url" : "https://groupme-movie-bot.herokuapp.com/"}}' -H 'Content-Type: application/json' https://api.groupme.com/v3/bots?token=f80cc46006ca01352bfd07722314ca56