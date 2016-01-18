// routes.js

//only works for numbers, no strings
var Hashids = require('hashids'),
    hashids = new Hashids("this is my salt");

//what you really want is:



module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
	function generateShort(input){
		//only works for numbers, no strings
		var id = hashids.encode(12345);
		return id;
		//what you really want is:
		
	}
    app.get('/', function(req, res) {
		console.log("got '/'")
        res.render('index.ejs'); // load the index.ejs file
    });
	app.get('/new/https://:url', function (req, res) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		
		var urlToShorten = "https://"+req.params.url;
		var shortCode = generateShort(urlToShorten);
		var results = { "original_url": "https://"+req.params.url, "short_url": req.protocol + '://' + req.get('host') + '/' + shortCode }
		
		res.send(results)
		});
	
	app.post('/api/whoami', function(req, res) {
		var langCapt = /([a-z]{2}-[A-Z]{2})/g;
		var softCapt = /\((.*)\)/g;
		var returnvalue = {
			"ipaddress": req.ip ||
					 req.connection.remoteAddress || 
					 req.socket.remoteAddress ||
					 req.connection.socket.remoteAddress ||
					req.headers['x-forwarded-for'],
			"language": req.headers['accept-language'].match(langCapt)[0],
			"software": softCapt.exec(req.headers['user-agent'])[1],
		}
        res.send(JSON.stringify(returnvalue)); // send STRING with JSON data inside
    });
}