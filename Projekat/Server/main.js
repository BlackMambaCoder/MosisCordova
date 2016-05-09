"use strict";
var httpServer = require('http').Server();
httpServer.listen(3000, '192.168.0.109');
var socketIo = require('socket.io')(httpServer);

//var mongoDbHelper = require('./mongoDBHelper.js');
//var serverSockets = require('./serverSockets.js');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var mongoDbServerURL = 'mongodb://192.168.0.109:27017/MosisPlaces';


// app.get('/', function(req, res){
//   // res.sendFile(__dirname + '/showMap.html');

//   console.log("Hello");
// });

socketIo.sockets.on('connection', function(socket)
{
	var currentTime = new Date();
	console.log("socket connected at " + currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds());

	console.log("========================");

	socket.on('getPlaces', function()
	{
		console.log("========================");
		console.log("getAllPlaces");

		MongoClient.connect(mongoDbServerURL, function(err, db)
		{
			if (err)
			{
				console.log('Unable to connect to the mongoDB server.');
				console.log('Error: ', err);
				socket.emit('getAllPlacesResult', "ERROR: " + err);
			}
			else
			{
				console.log('Connection established to ', mongoDbServerURL);

				var placeCollection = db.collection('places');

				placeCollection.find().toArray(function(err, docs)
				{
					socket.emit('getAllPlacesResult', docs);
					console.log("Niz svih povratnih vrednosti: ");
					console.log(docs);
				});

				db.close();
			}
		});
	});

	socket.on('addPlace', function(location)
	{
		console.log("========================");
		console.log("addNewPlace");

		MongoClient.connect(mongoDbServerURL, function(err, db)
		{
			if (err)
			{
				console.log('Unable to connect to the mongoDB server.');
				console.log('Error: ', err);
				socket.emit('addPlaceResult', "ERROR: " + err);
			}
			else
			{
				console.log('Connection established to ', mongoDbServerURL);

				var placeCollection = db.collection('places');
				var locationObject = JSON.parse(location);

				placeCollection.insert(locationObject, function(err, result)
				{
					if (err)
					{
						console.log("Error: Cannot insert place.");
						console.log("Error details: ", err);
						socket.emit('addPlaceResult', "ERROR: " + err);
					}
					else
					{
						console.log("Inserted place!");
						console.log("Details: ", result);
						socket.emit('addPlaceResult', "OK");
					}
				});

				db.close();
			}

			console.log("==================");
			console.log("");
		});
	});

	socket.on('updateLocation', function(location)
	{
		console.log("========================");
		console.log("getNearPlaces");

		var locObject = JSON.parse(location);

		var latPos = locObject.latitude;
		var lngPos = locObject.longitude;
		var usrName = locObject.username;
		var usrDistance = locObject.distance;

		console.log("Lat: " + latPos);
		console.log("lngPos: " + lngPos);
		console.log("usrName: " + usrName);
		console.log("usrDistance: " + usrDistance);

		MongoClient.connect(mongoDbServerURL, function(err, db)
		{
			if (err)
			{
				console.log('Unable to connect to the mongoDB server.');
				console.log('Error: ', err);
				socket.emit('updateLocationResult', "ERROR: " + err);
			}
			else
			{
				var placeCollection = db.collection('places');

				var cursor = placeCollection.find( { "username": usrName, "username": "default" } ).toArray(function(err, docs)
				{
					if (err)
					{
						socket.emit('updateLocationResult', "ERROR: " + err);
					}

					else
					{
						var retValue = [];

						for (var iterator = 0; iterator < docs.length; iterator++)
						{
							var doc = docs[iterator];
							var lat = doc.latitude;
							var lng = doc.longitude;

							var dis = distance(latPos, lngPos, lat, lng);

							if (dis < usrDistance)
							{
								retValue.push(doc);
							}
						}

						socket.emit('updateLocationResult', retValue);
						console.log("Niz najblizih povratnih vrednosti: ");
						console.log(retValue);
					}
				});

				db.close();
			}

			console.log("End getNearPlaces");
			console.log("========================");
		});
	});

	socket.on('getLocationByName', function(name)
	{
		console.log("========================");
		console.log("searchPlaceByName");

		MongoClient.connect(mongoDbServerURL, function(err, db)
		{
			if (err)
			{
				console.log('Unable to connect to the mongoDB server.');
				console.log('Error: ', err);
				socket.emit('getLocationByNameResult', "ERROR: " + err);
			}
			else
			{
				var placeCollection = db.collection('places');

			   	placeCollection.find({ "name": name }).toArray(function(err, docs)
				{
					if (err)
					{
						socket.emit('getLocationByNameResult', "ERROR: " + err);
					}
					else
					{
						socket.emit('getLocationByNameResult', docs);
						console.log("Niz svih povratnih vrednosti: ");
						console.log(docs);
					}
				});

				db.close();
			}

			console.log("================");
			console.log("");
		});
	});

	socket.on('getLocationByType', function(type)
	{
		console.log("========================");
		console.log("searchPlaceByType");

		MongoClient.connect(mongoDbServerURL, function(err, db)
		{
			if (err)
			{
				console.log('Unable to connect to the mongoDB server.');
				console.log('Error: ', err);
				socket.emit('getLocationByTypeResult', "ERROR: " + err);
			}
			else
			{
				var placeCollection = db.collection('places');

			   	placeCollection.find({ "locationtype": type }).toArray(function(err, docs)
				{
					if (err)
					{
						socket.emit('getLocationByTypeResult', "ERROR: " + err);
					}
					else
					{
						socket.emit('getLocationByTypeResult', docs);
						console.log("Niz svih povratnih vrednosti: ");
						console.log(docs);
					}
				});

				db.close();
			}

			console.log("================");
			console.log("");
		});
	});

	socket.on('disconnect', function()
	{
		var disconnectionTime = new Date();
		console.log("socket disconnected at " + disconnectionTime.getHours() + ":" + disconnectionTime.getMinutes() + ":" + disconnectionTime.getSeconds());
	});



	function distance (lat1, lon1, lat2, lon2)
	{
		var R = 6371000; // metres
		var fi1 = toRadians(lat1);
		var fi2 = toRadians(lat2);
		var dfi = toRadians(lat2-lat1);
		var dlam = toRadians(lon2-lon1);

		var a = Math.sin(dfi/2) * Math.sin(dfi/2) +
		        Math.cos(fi1) * Math.cos(fi2) *
		        Math.sin(dlam/2) * Math.sin(dlam/2);

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;

		return d;
	}

	function toRadians(value)
	{
		return value*Math.PI/180.0;
	}
});