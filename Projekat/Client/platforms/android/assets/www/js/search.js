var connected;

var upit1 = "tip:";
var upit2 = "ime:";

$(document).bind('pageinit', '#search_page' ,function(){
	
	document.addEventListener("deviceready", onDeviceReady, false); 

	//Button event-i
	$('#btn_back').bind('click', function(e){
    	window.location.assign('map.html');
    });


});

function onDeviceReady()
{
	$('#filterBasic-input').bind('click', function(e){
		checkQuery();
    });
}

function checkQuery()
{
	var query = $('#filterBasic-input').val();
	var finalquery;

	clearList();

		if(query)
		{
			if(query.indexOf(upit1) > -1)
			{
				finalquery = query.replace(upit1,"");
    			
				queryByTypeServer(finalquery,function(res)
				{
					showResults(res);
				});

    		}
    		else if(query.indexOf(upit2) > -1)
    		{
    			finalquery=query.replace(upit2,"");
    			
    			queryByNameServer(finalquery,function(res)
				{
					showResults(res);
				});	
    		}
    		else
    		{
    			alert("Lose unesen upit!");
    		}

    		
    	}
}


function clearList()
{
	$('#queryList').empty();
}

function showResults(res)
{
	//Rezultati
	$.each(res, function( i, queryPlace ){
        $('#queryList').append('<li>' + queryPlace.name + '</li>').listview('refresh');			
    });
}

