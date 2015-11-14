add_task = function() {
    FB.getLoginStatus(function(response) {
	if(response.status === 'connected')
	{
	    $.ajax({
		method: "POST",
		url: "/make-task-back",
		data: { "title": $("#title-input").val(),
			"description": $("#descrip-input").val(),
			"salary": $("#salary-input").val(),
			"lat" : 0, //TODO: Make this actually work
			"lon" : 0, 
			"uid": response.authResponse.userID
		      }
	    }).done(function(msg)
		    {
			console.log(msg);
		    });

	}
	else
	{
	    console.error("Not connected");
	}
    });
}
