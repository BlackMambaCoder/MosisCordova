var exports = module.exports = {};

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var mongoDbServerURL = 'mongodb://192.168.0.103:27017/data';

exports.storeLocation = function (location)
{
	var retValue;

	MongoClient.connect(mongoDbServerURL, function(err, db)
	{
		if (err)
		{
			console.log('Unable to connect to the mongoDB server.');
			console.log('Error: ', err);
			retValue = "Error: " + err;
		}
		else
		{
			console.log('Connection established to ', mongoDbServerURL);

			var placeCollection = db.collection('MosisPlaces');

			placeCollection.insert(location, function(err, result)
			{
				if (err)
				{
					console.log("Error: Cannot insert place.");
					console.log("Error details: ", err);
					retValue = "Error: " + err;
				}
				else
				{
					console.log("Inserted place!");
					console.log("Details: ", result);

					db.close();
					retValue = "OK";
				}
			});
		}

		console.log("==================");
		console.log("");
	});

	return retValue;
}