var devReady;
var currentPinLocation=null;

var defaultLat  = 43.331291;
var defaultLong = 21.892519;
var markerLat  = defaultLat;
var markerLong = defaultLong;


var placeAdd_msg = 'Lokacija uspesno dodata!';
var placeAdd_error = 'Lokacija nije uspesno dodata, doslo je do greske!';

$(document).bind('pageinit', '#add_place_page' ,function(){
	
	document.addEventListener("deviceready", onDeviceReady, false); 

	  $('#btn_back').bind('click', function(e){
        onBtnBack();
    });

     $('#chose_image').bind('click', function(e){
       takePlacePicture();
    });

    $('#save_place').bind('click', function(e){
      onSavePlace();
    });

});


function onBtnBack()
{
  window.location.assign('map.html');
}

function onSavePlace()
{

  var myPlace =  new Object();

  myPlace.name = $('#place_name').val();
  myPlace.username=window.localStorage.getItem("username");

  myPlace.latitude = markerLat;
  myPlace.longitude = markerLong;

  myPlace.locationtype = $('#place_type').val();

  if(!myPlace.name)
  {
    alert('Unesite naziv lokacije!!!');
    return; 
  }

  var placeJSON = JSON.stringify(myPlace);

  //console.log('Place: '+placeJSON);
  addPlaceOnServer(placeJSON,function(info)
  {
        if(info=='OK')
        {
          alert(placeAdd_msg);
          //Going back
          window.location.assign('map.html');
        }
        else
        {
          alert(placeAdd_error);
        }
  });
}

function onDeviceReady()
{  
    devReady=true;

    getUserLocation();
  
}

function getUserLocation()
{
      //Get current user location
    if ( navigator.geolocation ) {
        //Pronadjena lokacija uspesno
        function success(pos) {
            markerLat = pos.coords.latitude;
            markerLong = pos.coords.longitude;
            showLocation();
        }
        //Doslo je do greske, prikazuje default
        function fail(error) {
          alert("Doslo je do greske, na mapi se prikazuje standardna lokacija");
          showLocation();
        }
        //Pribavljanje lokacije korisnika
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        alert('Is geolocation enabled on this device?');
        showLocation();
    }
}

function showLocation()
{
   $('#mapContent').locationpicker({
            location: {latitude: markerLat, longitude: markerLong},   
            radius: 100,
            inputBinding: {
                latitudeInput: $('#locLatInput'),
                longitudeInput: $('#locLngInput'),
                radiusInput: $('#locRadiusInput'),
                locationNameInput: $('#locationInput')
            },
            
            onchanged: function(currentLocation, radius, isMarkerDropped) {
                markerLat  = currentLocation.latitude;
                markerLong = currentLocation.longitude;
            }
            
            });
}

function takePlacePicture()
{
  alert("Cordova camera plugin is not working in current version!");
}