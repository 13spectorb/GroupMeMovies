var director, https, moviebot, request, router, server

director = require('director');
https = require('https');
moviebot = require('./moviebot.js');

router = new director.http.Router({
    '/' : {
        post: moviebot.respond
    }
});

server = https.createServer(function(request, response) {

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
    
}).listen(8080);