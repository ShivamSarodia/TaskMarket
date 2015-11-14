// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
    FB.init({
	appId      : '1058707137497197',
	cookie     : true,  // enable cookies to allow the server to access 
        // the session
	xfbml      : true,  // parse social plugins on this page
	version    : 'v2.5' // use version 2.2
    });
}
