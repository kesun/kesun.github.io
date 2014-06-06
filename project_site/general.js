$(document).ready(function() {
	$("html").niceScroll({
		cursorwidth: "5px",
		cursorborder: "0px",
		cursorcolor: "#2E2E2E"
	});
	$('section[data-type="background"]').each(function(){
		var $bgobj = $(this);
		$(window).scroll(function(){
			var windowOff = $(window).scrollTop();
			var yPos = -(windowOff / $bgobj.data('speed'));
			var coords = '50% ' + yPos + 'px';
			var $arti = $bgobj.children("article");
			var offTop = $bgobj.offset().top - windowOff;
			var opac;
			if(offTop < -150 || offTop > 500){
				opac = 0;
			}else if(offTop < 0){
				opac = 1 - (-offTop) / 150;
			}else if(offTop > 300){
				opac = 1 - (offTop - 300) / 200;
			}else{
				opac = 1;
			}
			$arti.css("opacity", opac);
			$bgobj.css({ backgroundPosition: coords});
			/*
			$bgobj.animate({
				backgroundPosition: coords
			});
			$arti.animate({
				opacity: opac
			});
			*/
		});
	});
});