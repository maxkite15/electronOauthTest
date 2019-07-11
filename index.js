// Import the express lirbary
const express = require('express')
const bodyParser = require('body-parser');

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '05a49e0f9864bb61b880'
const clientSecret = 'f6db0958b66a7619b9afb5768f729d824f05bcd8'

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extend:true}));

console.log('##################');
//Это тест для gitHub
app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  console.log('$$$$$$$$$$$$$$$$', requestToken);
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
	console.log('TEST_______________________');
	//mainWindow.loadURL(`http://localhost:8180/welcome.html?access_token=${accessToken}`)
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
});

app.post('/token', function (req, res) {
	res.send({
		message: 'Success Neuro Authorization!',
		data: req.body.access_token
	});
});

app.post('/get_token', function (req, res) {
	//здесь вообще надо в качестве redirect_uri указать что-то типа http://localhost:8180/token
	console.log('GET TOKEN BODY: ', req.body);
	let redirect_uri = req.body.redirect_uri ? req.body.redirect_uri : 'http://localhost:8180/token/';
	client_id = req.body.client_id;
	var url = `http://cdb.neurop.org:8080/npe/connect/authorize?client_secret=${req.body.client_secret}&client_id=${req.body.client_id}&response_type=token&response_mode=form_post&redirect_uri=${redirect_uri}&scope=api&state=${req.body.state}`;
	//var url = `http://cdb.neurop.org:8080/npe/connect/authorize?client_secret=${req.body.client_secret}&client_id=${req.body.client_id}&response_type=token&response_mode=form_post&redirect_uri=http://localhost:8180/token/&scope=api&state=${req.body.state}`;
	res.status(301).redirect(url);
});

// Start the server on port 8080
let port = process.env.PORT || 8180;
console.log('PORT: ', port);
app.listen(port)
