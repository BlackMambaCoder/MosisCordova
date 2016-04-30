

$( document ).bind( "pageinit", "#mainPage", function() 
{
    $( "#btnAddCurrentLocation" ).click(function() 
    {
        var socket = io.connect('http://192.168.0.103:3000');

        socket.emit('addLocationSocket', 'begin');

        navigator.geolocation.getCurrentPosition(function(pos)
            {
                socket.emit('addLocationSocket', pos.coords.latitude + ':' + pos.coords.longitude);
            },
            function(err)
            {
                socket.emit('addLocationSocket', 'error in current position');
            });
    });

    initializeMap();

    

    

    
});


function initializeMap()
{
    var defaultLatLng = new google.maps.LatLng(0.0, 0.0);  // Default to Hollywood, CA when no geolocation support

    if ( navigator.geolocation.getCurrentPosition ) {
        function success(pos) {
            // Location found, show map with these coordinates
            alert("Geolocation success in drawing map");

            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //drawMap(new google.maps.LatLng(0.0, -50.0));
            

        }
        function fail(error) {
            alert("Geolocation fail: " + err);
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
            alert("No geolocation");
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 4,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
}