on_login_click = function() {
    console.log("Login clicked");
    FB.getLoginStatus(function(response) {
	if (response.status === 'connected')
	{
	    sendLogon(response);
	}
	else
	{
	    FB.login(function(response)
		     {
			 console.log(response);
			 if (response.status == 'connected')
			 {
			     sendLogon(response);
			 }
			 else if (response.status == 'not_authorized')
			 {
			     // Logged into FB, but not the app
			 }
			 else
			 {
			     // Not logged into FB at all
			 }
			 
		     })
	}
    });
}

function sendLogon(response)
{
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;

    FB.api('/me', function(response) {
	var name = response.name;

	$.ajax({
	    method: "POST",
	    url: "/login-back",
	    data: { "uid": uid, "accessToken": accessToken, "fullName": name}
	}).done(function( msg ) {
	    console.log(msg);
	});
    });    
}

function isLoggedIn() // DO NOT CALL ON PAGE LOAD!!!
{
    return (FB.getAuthResponse() != null);
}
