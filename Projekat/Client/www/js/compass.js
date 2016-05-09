$(document).bind('pageinit', '#compass_page' ,function(){
	
	document.addEventListener("deviceready", onDeviceReady, false); 

	//Button event-i
	$('#btn_back').bind('click', function(e){
    	window.location.assign('map.html');
    });

});

function onDeviceReady()
{
	if(navigator.compass)
	{
	var watchID = navigator.compass.watchHeading(updateCompass, compassError, {
    frequency: 1000}); //Update na sekundu
 	}
 	else
 	{
 		alert("Uredjaj ne poseduje kompas!");
 		window.location.assign('map.html');
 	}
}


function updateCompass(heading)
{
	var rotation = 360 - heading;
	$compass.css('-webkit-transform', rotation);
}

function compassError(error)
{

}