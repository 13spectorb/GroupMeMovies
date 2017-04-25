/* Node.js */

var http = require("http");
var botID = process.env.BOT_ID;
var movies;

//
function respond() {
	var requestBody = JSON.parse(this.request.body[0]),
		// regex = new RegExp('movie', 'MOVIE', 'Movie')
		regex = new RegExp('movie');

	if(requestBody.text && regex.test(requestBody.text)) {
		getMovies();
		this.response.writeHead(200);
		postMovies();
		this.response.end();
	} else {
		this.response.writeHead(200);
		this.response.end();
	}
}

function getMovies() {
	var today = new Date();
	var oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate()-7);

	var options = {
	  "method": "GET",
	  "hostname": "api.themoviedb.org",
	  "port": null,
	  "path": "/3/discover/movie?primary_release_date.lte="+today+"&primary_release_date.gte="+oneWeekAgo+"&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=efcba7f7bb771e30b271a2c4cc3b0a53",
	  "headers": {}
	};

	var getMoviesRequest = http.request(options, function (getMoviesResponse) {
	  var body = [];

	  getMoviesResponse.on("data", function (chunk) {
	    body.push(chunk);
	  });

	  getMoviesResponse.on("end", function () {
	    body = Buffer.concat(body).toString();
	    console.log(body.toString());
	    movies = body;
	  });
	});

	getMoviesRequest.write("{}");
	getMoviesRequest.end();

}

function postMovies() {
	var options, postMoviesBody, postMoviesReq;

	options = {
		hostname: 'https://groupme-movie-bot.herokuapp.com/',
		path: '/v3/bots/post',
		method: 'POST'
	};

	postMoviesBody = {
		"bot_id" : 'dd48f9623940e77715a0874f5a',
		"text" : "movies"
	}

	postMoviesReq = http.request(options, function(response) {
		if(response.statusCode != 202) {
        	console.log('bad status code ' + response.statusCode);
      	}
	});

	postMoviesReq.on('error', function(err) {
    	console.log('error:' + JSON.stringify(err));
  	});
  	postMoviesReq.on('timeout', function(err) {
	    console.log('timeout: ' + JSON.stringify(err));
  	});
	postMoviesReq.end(JSON.stringify(postMoviesBody));
}

exports.respond = respond;