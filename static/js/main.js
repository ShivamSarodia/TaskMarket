
$(document).ready(function(){
    $('.task-cont').click(function(){
        $(this).next('.info-info').slideToggle("slow");
    });

    $('.other_job').click(function(){
        $(this).next('.other_job_info-info').slideToggle("slow");
    });
    
    $('.your_job').click(function(){
        $(this).next('.your_job_info-info').slideToggle("slow");
    });

    $('.submit-btn').click(function(){
	$.ajax({
	    method: "POST",
	    url: "/accept-task-back",
	    data: {"tid": $(this).data("taskid")}
	}).done(function(msg){
	    console.log(msg);
	    window.location = "/profile";
	});
    })
    setTimeout(function(){
	console.log("called timeout");
	FB.getLoginStatus(function(response) {
	    console.log("Got response");
	    console.log(response);
	    if (response.status === 'connected') {
		console.log("yee");
		$("li#login").html("&nbsp");
	    }
	});}, 1000);
});









