// routes.js
module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
		console.log("got '/'")
        res.render('index.ejs'); // load the index.ejs file
    });
	app.get('/api/whoami', function(req, res) {
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
        res.send(returnvalue); // load the index.ejs file
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