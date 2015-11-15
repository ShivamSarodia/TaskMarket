function initMap() {
    navigator.geolocation.getCurrentPosition(function(response) {
	var myLatLng = {lat: response.coords.latitude, lng: response.coords.longitude};

	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 16,
	    center: myLatLng
	});

	// var mymarker = new google.maps.Marker({
	//     position: myLatLng,
	//     map: map,
	// });

	for (i = 0; i < markers.length; i++)
	{
	    var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
	    
            //bounds.extend(position);
	    console.log(markers[i]);
            marker = new google.maps.Marker({
		position: position,
		map: map,
		title: markers[i].title
	    });
	}

	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
	    origins:[myLatLng],
	    destinations: dests,
	    travelMode: google.maps.TravelMode.DRIVING,
	    unitSystem: google.maps.UnitSystem.IMPERIAL,
	    avoidHighways: false,
	    avoidTolls: false
	}, function(response, status) {
	    if (status !== google.maps.DistanceMatrixStatus.OK) {
		console.error("Error was: " + status);
	    }
	    else
	    {
		var results = response.rows[0].elements;
		for(i = 0; i < results.length; i++)
		{
		    $(".location").get(i).innerHTML = results[i].distance.text;
		}
	    }
	})
    });
}
    
