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

	var markers = [] /*nested arrays of every posting from shivam*/

	for (i = 0; i < markers.length; i++)
	{
	    var position = new google.maps.LatLng(markers[i].lat, markers[i].lon);
	    
            //bounds.extend(position);
            marker = new google.maps.Marker({
		position: position,
		map: map,
		title: markers[i].title
	    });
	}
    });
}
    
