var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
httpServer.listen(3000, '192.168.0.103');
var socketIo = require('socket.io')(httpServer);

var mongoDbHelper = require('./mongoDBHelper.js');


app.get('/', function(req, res){
  // res.sendFile(__dirname + '/showMap.html');

  console.log("Hello");
});

socketIo.sockets.on('connection', function(socket)
{
	var currentTime = new Date();

	console.log("socket connected at " + currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds());

	socket.on('storePicture', function(msg)
	{
		console.log("Picture taken: " + msg);

		//mongoDbHelper.storeLocation(msg);
	});


	socket.on('storeLocation', function(msg)
	{
		var messageArray = msg.split(",");
	});

	socket.on('storeGlobalLocations', function(locationObject)
	{
		console.log("Received object");
		console.log("Name: " + locationObject["name"]);
		console.log("Description: " + locationObject["description"]);
		console.log("Latitude: " + locationObject["latitude"]);
		console.log("Longitude: " + locationObject["longitude"]);
		console.log("");

		var result = mongoDbHelper.storeLocation(locationObject);

		console.log("Result: " + result);
		console.log("======================");
		console.log("");
		//socket.emit('locationStoreResult', result);
	});
});