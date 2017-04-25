var http, director, cool, moviebot, router, server, port;

http        = require('http');
director    = require('director');
moviebot    = require('./moviebot.js');

router = new director.http.Router({
    '/' : {
        post: moviebot.respond,
        get: ping
    }
});

server = http.createServer(function (req, res) {
    request.body = [];

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();

    router.dispatch(req, res, function(err) {
        res.writeHead(err.status, {"Content-Type": "text/plain"});
        res.end(err.message);
    });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
    this.res.writeHead(200);
    this.res.end("Hey, I'm The MovieBot.");
}