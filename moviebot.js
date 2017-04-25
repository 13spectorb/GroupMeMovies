/* Node.js */

/*
groupme_token="f80cc46006ca01352bfd07722314ca56";
group_id="30555241"
group_name="MovieChat";
bot_id="dd48f9623940e77715a0874f5a"
*/

var http = require("http");
const mdb = require('moviedb')('efcba7f7bb771e30b271a2c4cc3b0a53');
var botID = process.env.BOT_ID;

function respond() {
	var requestBody = JSON.parse(this.request.body[0]),
		regex = new RegExp('movie', 'MOVIE', 'Movie');

	if(requestBody.text && regex.test(requestBody.text)) {
		this.response.writeHead(200);
		postMovies(getMovies());
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

	var req = http.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
	    chunks.push(chunk);
	  });

	  res.on("end", function () {
	    var body = Buffer.concat(chunks);
	    console.log(body.toString());
	  });
	});

	req.write("{}");
	req.end();
	
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
		"text" : "movies"
	}

	request = http.request(options, function(response) {
		if(response.statusCode != 202) {
        	console.log('bad status code ' + response.statusCode);
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