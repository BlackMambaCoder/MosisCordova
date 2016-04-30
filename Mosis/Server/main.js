// var io = require('socket.io');
// var server = http.createServer();
// server.listen(3000, 'localhost');
// var socket = io.listen(server);

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
	console.log("socket connected");
	socket.on('addLocationSocket', function(msg)
	{
		console.log("From client side: " + msg);

		mongoDbHelper.storeLocation(msg);
	});

	socket.on('disconnection', function(msg)
	{
		console.log("Disconnection");
	});
});