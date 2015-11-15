$(document).ready(function() {initialize();});
add_task = function() {
    FB.getLoginStatus(function(response) {
	if(response.status === 'connected')
	{
	    geocoder = new google.maps.Geocoder();
	    var address = document.getElementById("my-address").value;
	    geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {

		    $.ajax({
			method: "POST",
			url: "/make-task-back",
			data: { "title": $("#title-input").val(),
				"description": $("#descrip-input").val(),
				"salary": $("#salary-input").val(),
				"address": address,
				"lat" : results[0].geometry.location.lat(), //TODO: Make this actually work
				"lon" : results[0].geometry.location.lng(), 
				"uid": response.authResponse.userID
			      }
		    }).done(function(msg)
			    {
				console.log(msg);
			    });

		} 

		else {
		    alert("Geocode was not successful for the following reason: " + status);
		}
	    });
	}
	else
	{
	    console.error("Not connected");
	}
    });
}

initialize = function() {
    var address = (document.getElementById('my-address'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
	var place = autocomplete.getPlace();
	if (!place.geometry) {
	    return;
	}

	var address = '';
	if (place.address_components) {
	    address = [
		(place.address_components[0] && place.address_components[0].short_name || ''),
		(place.address_components[1] && place.address_components[1].short_name || ''),
		(place.address_components[2] && place.address_components[2].short_name || '')
	    ].join(' ');
	}
    });
}
