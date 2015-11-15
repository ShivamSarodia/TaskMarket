function initMap() {
    navigator.geolocation.getCurrentPosition(function(response) {
	var myLatLng = {lat: response.coords.latitude, lng: response.coords.longitude};

	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 16,
	    center: myLatLng
	});

	var mymarker = new google.maps.Marker({
	    position: myLatLng,
	    map: map,
	});

	for (i = 0; i < markers.length-1; i++) //since last element is dummy
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
    });
}
    
