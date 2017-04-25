/* Node.js */

var http, director, cool, moviebot, router, server, port;

http        = require('http');
director    = require('director');
moviebot    = require('./moviebot.js');


//simple router to call moviebot.respond when a POST request is received
router = new director.http.Router({
    '/' : {
        post: moviebot.respond,
        get: ping
    }
});

//create a new server to listen for HTTP requests.
server = http.createServer(function (request, response) {
    request.body = [];

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        request.body.push(chunk.toString());
        console.log(request.body);
    });

    router.dispatch(request, response, function(err) {
        response.writeHead(err.status, {"Content-Type": "text/plain"});
        response.end(err.message);
    });
});

port = Number(process.env.PORT || 8080);
server.listen(port);

function ping() {
    this.response.writeHead(200);
    this.response.end("Hey, I'm The MovieBot.");
}