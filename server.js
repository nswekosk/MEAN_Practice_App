var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var api = require('./app/routes/api')(app, express, io);

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', api);

app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res){

	res.sendFile(__dirname + "/public/app/views/index.html");

});

mongoose.connect(config.database, function(err){

	if(err){
		console.log(err);
	}else{
		console.log("Connected to database");
	}

});

http.listen(config.port, function(err){

	if(err){
		console.log(err);
	}else{
		console.log("App running on port " + config.port);
	}

});
