var https, moviebot, request, router, server

// var director = require('director');
https = require('http');
moviebot = require('./moviebot.js');

// router = new director.http.Router({
//     '/' : {
//         post: moviebot.respond
//     }
// });

server = http.createServer(function(request, response) {

    request.body = [];

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();

        moviebot.respond();


        // router.dispatch(req, res, function(err) {
        //     res.writeHead(err.status, {"Content-Type": "text/plain"});
        //     res.end(err.message);
        // });
    
    });
});
server.listen(process.env.PORT);