//===================================
// DEVICE HELPER 
// Metode za rad sa uredjajem
//===================================

 var defaultLatLng = new google.maps.LatLng(43.331291, 21.892519); //Pozicija Elfak-a kao default pozicija


function geolocation_UserLocation(latlong,err)
{
    if ( navigator.geolocation ) {
        function success(pos)
        {
           latlong(pos);
           return;
        }

        function fail(error) {
          err(message);
          return;
        }

        //Pribavljanje lokacije
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    }
    else
    {
      latlong(defaultLatLng);
      return;
    }
}

function takePicture(picture,err)
{
  
  if(navigator.camera)
  {
    //navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI sourceType:pictureSource.PHOTOLIBRARY Camera: add_place.html}); 

    function onSuccess(imageURI) {
      picture(imageURI);
      return;
    }

    function onFail(message) {
      err(message);
      return;
    }

  }
  else
  {
      err('No camera!');
      return;
  }
}