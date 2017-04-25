// var https, moviebot, request, router, server


// var director = require('director');
// http = require('http');
// moviebot = require('./moviebot.js');

// router = new director.http.Router({
//     '/' : {
//         post: moviebot.respond
//     }
// });

// server = http.createServer(function(request, response) {

//     request.body = [];

//     request.on('error', function(err) {
//         console.error(err);
//     }).on('data', function(chunk) {
//         body.push(chunk);
//     }).on('end', function() {
//         body = Buffer.concat(body).toString();

//         moviebot.respond();


//         // router.dispatch(req, res, function(err) {
//         //     res.writeHead(err.status, {"Content-Type": "text/plain"});
//         //     res.end(err.message);
//         // });
    
//     });
// });
// server.listen(process.env.PORT);

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
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}