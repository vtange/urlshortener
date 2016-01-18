// routes.js

//only works for numbers, no strings
var Hashids = require('hashids'),
    hashids = new Hashids("hi");

module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
	function numberfromURL(input){
		return input.split("").map(function(letter){return letter.charCodeAt(0);});
	}
	function generateShort(input){
		//only works for numbers or array of nums, no strings
		return hashids.encode(numberfromURL(input));
	}
	function decode(input){
		var arr = hashids.decode(input);
		return arr.map(function(num){return String.fromCharCode(num);}).join("");
	}
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
	app.get('/new/https://:url', function (req, res) {		
		var urlToEncode = req.params.url;
		var shortCode = generateShort(urlToEncode);
		var results = { "original_url": "https://"+req.params.url, "short_url": req.protocol + '://' + req.get('host') + '/' + shortCode }
		res.send(results)
		});
	app.get('/:code', function (req, res) {
		var urlToDecode = req.params.code;
		var origURL = decode(urlToDecode);
		res.redirect("https://"+origURL)
		});
}