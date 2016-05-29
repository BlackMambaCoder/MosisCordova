/*  ==== METODE I VARIABLE ZA KOMUNIKACIJU SA SERVEROM ==== */

/* VARIABLE */

var connectionSocket;

var SERVER_IP_ADDRESS = 'http://192.168.0.110:3000';

/* METODE ZA ODRZAVANJE KONEKCIJE */


function connectOnServer()
{
    connectionSocket = io(SERVER_IP_ADDRESS);
    connectionSocket.connect();
}

function disconnectFromServer()
{
    connectionSocket.disconnect();
}

function testConnection()
{
	connectionSocket = io(SERVER_IP_ADDRESS);
    connectionSocket.connect();

    connectionSocket.on('connect',function()
    {
    	connectionSocket.emit('log','Debug...');
    	connectionSocket.disconnect();
    });
}

function getPlacesFromServer(res)
{
    connectionSocket.emit('getPlaces',' ');

    connectionSocket.on('getAllPlacesResult',function(msg)
    {
    	res(msg);
    	return;
    });

    connectionSocket.on('error',function(msg)
    {
    	res(null);
    	return;
    });
}

function addPlaceOnServer(msg,res)
{
    connectionSocket = io(SERVER_IP_ADDRESS);
    connectionSocket.connect();

    connectionSocket.on('connect',function()
    {
        connectionSocket.emit('addPlace',msg);
    });

    connectionSocket.on('addPlaceResult',function(msg)
    {
        res(msg);
        connectionSocket.disconnect();
        return;
    });
}

function updatePositionServer(msg,nearest)
{
    connectionSocket.emit('updateLocation',msg);

    connectionSocket.on('updateLocationResult',function(places)
    {
        nearest(places);
        return;
    });
}

function queryByNameServer(query,result)
{
    connectionSocket = io(SERVER_IP_ADDRESS);
    connectionSocket.connect();
    
    connectionSocket.on('connect',function()
    {
        connectionSocket.emit('getLocationByName',query);
    });

    connectionSocket.on('getLocationByNameResult',function(msg)
    {
        result(msg);
        connectionSocket.disconnect();
        return;
    });
}


function queryByTypeServer(query,result)
{
    connectionSocket = io(SERVER_IP_ADDRESS);
    connectionSocket.connect();

    connectionSocket.on('connect',function()
    {
        connectionSocket.emit('getLocationByType',query);
    });

    connectionSocket.on('getLocationByTypeResult',function(msg)
    {
        result(msg);
        connectionSocket.disconnect();
        return;
    });
}