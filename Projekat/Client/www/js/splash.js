$(document).bind('pageinit', '#splash_page' ,function(){
	
	loadSplashImage();

	setTimeout(changePage, 2000);

});

function loadSplashImage()
{
	 var canvas = document.getElementById('myCanvas');
     var context = canvas.getContext('2d');
     var imageObj = new Image();

     imageObj.onload = function() {
     	canvas.width = imageObj.width;
     	canvas.height = imageObj.height;
        context.drawImage(imageObj,0,50,imageObj.width,imageObj.height);
      };
      
     imageObj.src = 'img/splash.png';
}

function changePage()
{
 	window.location.href = "login.html";
}