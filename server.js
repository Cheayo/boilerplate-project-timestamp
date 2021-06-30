// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/", function (req, res) {
  let nowQ = new Date();
  res.json({unix: nowQ.getTime(), utc: nowQ.toUTCString()});
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", function (req, res) {
  let dateQ = new Date(req.params.date);

// dealing with epoch seconds, if provided date is actually epoch seconds this will catch it
  if (dateQ.toString() === "Invalid Date") {
    dateQ = new Date(+req.params.date);
  }

// OK still invalid, wasn't epoch seconds, fail
  if (dateQ.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: dateQ.getTime(), utc: dateQ.toUTCString()});
  };
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
