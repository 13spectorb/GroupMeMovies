/* Node.js */
var http = require("http");

http.createServer(function (request, response) {

   
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });

  // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
  
}).listen(8080); // Activates this server, listening on port 8080.

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

groupme_token="f80cc46006ca01352bfd07722314ca56";
group_id="30555241"
group_name="MovieChat";
bot_id="76651f6a40966c5143a76c44e3"

var xhr = new XMLHttpRequest();



// curl -X POST -d '{"bot": { "name": "MovieBot", "group_id": "30555241", "callback_url" : "https://groupme-movie-bot.herokuapp.com/"}}' -H 'Content-Type: application/json' https://api.groupme.com/v3/bots?token=f80cc46006ca01352bfd07722314ca56