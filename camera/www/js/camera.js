$( document ).bind( "pageinit", "#cameraPage", function() 
{
    $( "#takePicBtn" ).click(
        function()
        {
			//alert("button clicked");
			var socket = io.connect('http://192.168.0.103:3000');
			socket.emit('storePicture', 'begin');
            
            navigator.camera.getPicture(function success ()
            	{
        			socket.emit('storePicture', 'success');
                    var image = document.getElementById('myImage');
                    image.src = "data:image/jpeg;base64," + imageData;
        			//displayImage(imageUri);
            	}, 
            	function fail ()
            	{
        			socket.emit('storePicture', 'error');
            	}, 
            	{
				    quality: 100,
				    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
				    encodingType: Camera.EncodingType.PNG,
                    correctOrientation: true
				});
        			
			socket.emit('storePicture', 'finished');

			// function displayImage(imgUri) {

			//     var elem = document.getElementById('imageFile');
			//     elem.src = imgUri;
			// };
        });
});