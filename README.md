# urlshortener

Client sends a url, Server encodes it and gives a encoded URL

## Tech
 Express, ```hashid``` module

## Niceties && Detail

Convert text to Character codes
```
	function numberfromURL(input){
		return input.split("").map(function(letter){return letter.charCodeAt(0);});
  }
```
Redirect from encoded url

```
	app.get('/:code', function (req, res) {
		var urlToDecode = req.params.code;
		var origURL = decode(urlToDecode);
		res.redirect("http://"+origURL)
});
```
