$(document).ready(function() {

	$("#NavPanel ul li ul").hide(); 

	$("#NavPanel ul li").hover(
        function () {
		$(this).children("ul").slideDown("slow");
        },function(){
		$(this).children("ul").slideUp("slow");
	});//hover
	
});// document ready