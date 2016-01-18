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
	function getURLinfo(req, res){
		var urlToEncode = req.params.url;
		var shortCode = generateShort(urlToEncode);
		var results = { "original_url": "http://"+req.params.url, "short_url": req.protocol + '://' + req.get('host') + '/' + shortCode }
		res.send(JSON.stringify(results));
	}
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
	app.get('/new/:url', function(req, res){res.send(JSON.stringify({"error":"Please include 'http://'"}))});
	app.get('/new/https://:url', function(req, res){getURLinfo(req, res)});
	app.get('/new/http://:url', function(req, res){getURLinfo(req, res)});
	app.post('/new/http://:url', function(req, res){getURLinfo(req, res)});
	app.get('/:code', function (req, res) {
		var urlToDecode = req.params.code;
		var origURL = decode(urlToDecode);
		res.redirect("http://"+origURL)
		});
}