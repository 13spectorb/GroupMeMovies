/* Node.js */

var http, botID, movies, today, oneWeekAgo;

http 		= require("http");
botID 		= process.env.BOT_ID;
movies 		= "";
today 		= new Date();
oneWeekAgo 	= new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate()-7);

// parse the request body text for movie and if it exists post a response
function respond() {
	var requestBody = JSON.parse(request.body[0]),
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

// fetches movies released within the last week from The Movie Database.
function getMovies() {
	var updatedToday = new Date();
	
	//only fetch movies if a day has passed (i.e. only fetch once per day)
	if (updatedToday != today) {
		today = updatedToday;
		var options = {
		  	"method": "GET",
		  	"hostname": "api.themoviedb.org",
		  	"port": null,
		  	"path": "/3/discover/movie?primary_release_date.lte="+today+"&primary_release_date.gte="+oneWeekAgo+"&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=efcba7f7bb771e30b271a2c4cc3b0a53",
		  	"headers": {}
		};

		var getMoviesRequest = http.request(options, function (TMDB_response) {
		  	var body = [];

		  	TMDB_response.on("data", function (chunk) {
		    	body.push(chunk);
		  	});

		  	TMDB_response.on("end", function () {
			    body = Buffer.concat(body);
			    movies = "";
			    for (var movie in body.results) {
			    	movies = movies+(movie["title"].toString() + "\n");
			    }
		  	});
		});

		getMoviesRequest.write("{}");
		getMoviesRequest.end();
	}
}

function postMovies() {
	var options, postMoviesBody, postMoviesReq, postText;

	postText = "movies showing this week: \n" + movies;

	options = {
		hostname: 'api.groupme.com',
		path: '/v3/bots/post',
		method: 'POST'
	};

	postMoviesBody = {
		"bot_id" : botID,
		"text" : postText
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