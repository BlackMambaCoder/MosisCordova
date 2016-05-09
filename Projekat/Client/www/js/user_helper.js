var defaultUser="Tester";
var currentUser;

function setUser(user)
{
	currentUser = user;
}

function getUser(user) {

	if(currentUser)
	{
		user(currentUser);
	}
	else
	{
		user(defaultUser);
	}
	
}