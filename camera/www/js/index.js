

$( document ).bind( "pageinit", "#mainPage", function() 
{
    var socket = io.connect('http://192.168.0.103:3000');
	
	socket.on('locationStoreResult', function(result)
	{
		alert(result);
		//document.getElementById("resultElement").innerHTML = result;
	});
});

$( "#btnOpenMap" ).click(function()
{
    var myWindow = window.open("map.html", "_self");
});

$( "#btnAddLocation" ).click(function()
{
	var nameVal = $('#inputName').val();
	var descriptionVal = $('#inputDescription').val();
	var latitudeVal = $('#inputLatitude').val();
	var longitudeVal = $('#inputLongitude').val();

	var locationObject = 
	{
		name: nameVal,
		description: descriptionVal,
		latitude: latitudeVal,
		longitude: longitudeVal
	};

	var socket = io.connect('http://192.168.0.103:3000');
	socket.emit('storeGlobalLocations', locationObject);
});