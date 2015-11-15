
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
});









