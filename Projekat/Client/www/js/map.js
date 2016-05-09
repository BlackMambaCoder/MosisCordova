var googleMap;
var infoWindow;
var watchID = null;
var minut=60000;

var myMarker;
var locationsMarker;

$(document).bind('pageinit', '#mapa_page' ,function(){

    document.addEventListener("deviceready", onDeviceReady, false); 
   
    locationsMarker=new Array();

    // Btn click event-i

    $('#btn_search').bind('click', function(e){
        gotoSearchPage();
    });

    $('#btn_add').bind('click', function(e){
        gotoAddPage();
    });

    $('#btn_location').bind('click', function(e){
        googleMap.setCenter(myMarker.position);
    });

    $('#btn_compass').bind('click', function(e){
        gotoCompassPage();
    });

});

function gotoCompassPage()
{
    disconnectFromServer();
    window.location.assign('compass.html');
}

function onDeviceReady()
{
    connectOnServer();
    checkServerPlaces();
    gotoMyPosition();
}

function checkServerPlaces()
{
    getPlacesFromServer(function(res)
    {
        $.each(res, function( i, serverPlace ){
            var name = serverPlace.name;
            var description = '<h3>'+name+'</h3>'+'<p>'+serverPlace.locationtype+'</p>';
            var place_location = new google.maps.LatLng(serverPlace.latitude, serverPlace.longitude);

            createPlaceMarker(name,description,place_location);
        });
    });
}

function drawMap(latlng) {
    
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    googleMap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    createMarker('My location','<p> My place </p>',latlng);
}

function createPlaceMarker(title_data,text_data,location_data)
{
    var marker = new google.maps.Marker({
        map: googleMap,
        position: location_data,
        title:title_data,
        content:text_data
    });


    //Init za prikaz info prozora
    infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(text_data);
        infoWindow.open(googleMap, this);
    });

    locationsMarker.push(marker);
    //console.log("Place: "+title_data+" "+text_data+" "+location_data);
}

function createMarker(title_data,text_data,latlng) {

    myMarker = new google.maps.Marker({
        map: googleMap,
        position: latlng,
        title:title_data,
        content:text_data
    });

    //Init za prikaz info prozora
    infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(myMarker, 'click', function () {
        infoWindow.setContent(text_data);
        infoWindow.open(googleMap, this);
    });
}

function gotoSearchPage()
{
    disconnectFromServer();
    window.location.assign('search.html');

}

function gotoAddPage()
{
     disconnectFromServer();
     window.location.assign('add_place.html');
}

function gotoMyPosition()
{
    var defaultLatLng = new google.maps.LatLng(43.331291, 21.892519); //Pozicija Elfak-a kao default pozicija

    if ( navigator.geolocation ) {
        //Pronadjena lokacija uspesno
        function success(pos) {
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        //Doslo je do greske, prikazuje default
        function fail(error) {
            alert('Error: '+error.message);
            drawMap(defaultLatLng);  
        }
        //Pribavljanje lokacije korisnika
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 2*minut}); //2minuta
        //Watchdog
        watchID = navigator.geolocation.watchPosition(onUpdateLocation,onUpdateLocationError, {timeout: 2*minut}); //timeout 2min
     } else {
        alert('No geolocation sucess');
        drawMap(defaultLatLng);  // Ako nema podrske za geolocation, prikazuje se default pozicija
    }
}

function onUpdateLocation(position)
{
    myMarker.setPosition = position;

    var myPosition = new Object();

    myPosition.latitude = position.coords.latitude;
    myPosition.longitude = position.coords.longitude;
    myPosition.username=window.localStorage.getItem("username");
    myPosition.distance="500";

    var positionJSON = JSON.stringify(myPosition);
    updatePositionServer(positionJSON,function(nearest)
    {

        var alertMsg;

        if(nearest.length>1)
        {   
            alertMsg="U vasoj blizini se nalaze lokacije: ";
        }
        else if(nearest.length==1)
        {
            alertMsg="U vasoj blizini se nalazi lokacija: ";
        }

        $.each(nearest, function( i, serverPlace ){
            var name = serverPlace.name;

            if(i<nearest.length-1)
            {
                alertMsg+=name+", ";
            }
            else
            {
                alertMsg+=name;
            }
        });

        if(nearest.length>0)
        {
         alert(alertMsg);
        }
    });
}

function onUpdateLocationError(error)
{
    console.log(error);
}

