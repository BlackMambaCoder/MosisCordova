$(document).bind('pageinit', '#login_page' ,function(){

 	document.addEventListener("deviceready", onDeviceReady, false); 

});

function onDeviceReady()
{
	$('#btn_login').bind('click', function(e){
        loginUser();
    });
}


function loginUser()
{
	var username = $('#user_name').val();

	if(!username)
	{
		alert('Morate uneti korisnicko ime!');
		return;
	}

	window.localStorage.setItem("username", username);
	window.location.assign('map.html');
}