
$( "#btnAddLocationFromMap" ).click(function()
{
    alert("Add location clicked");
    var nameVal = $('#locationInput').val();
    var descriptionVal = $('#locDescription').val();
    var latitudeVal = $('#locLatInput').val();
    var longitudeVal = $('#locLngInput').val();

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