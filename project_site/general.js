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
			var yPos2 = -(windowOff / 5);
			var coords = '50% ' + (400+yPos) + 'px';
			var coords2 = '50% ' + (500+yPos2) + 'px';
			var $arti = $bgobj.children("article");
			var offTop = $bgobj.offset().top - windowOff;
			var opac;
			if($bgobj.attr('id') == "s1"){
				if(offTop < -150 || offTop > 600){
					opac = 0;
				}else if(offTop < 0){
					opac = 1 - (-offTop) / 150;
					var leftTotal = 30;
					var rightTotal =  50;
					var leftH = opac * 30 - 250;
					var rightH = 280 - opac * 50;
					$('#se1Left').css({ left: leftH + "px" });
					$('#se1Right').css({ left: rightH + "px" });
				}
				else if(offTop > 400){opac = 1 - (offTop -400) / 200;
				}else{
					opac = 1;
				}
			}else{
				if(offTop < 0 || offTop > 700){
					opac = 0;
				}else if(offTop < 150){
					opac = offTop / 150;
				}else if(offTop > 500){
					opac = 1 - (offTop - 500) / 200;
				}else{
					opac = 1;
				}
			}
			//$arti.css({ "opacity": opac });
			$bgobj.css({ backgroundPosition: coords });
			$('#grass2').css({ backgroundPosition: coords2 });
			$('#cloud1').css({ backgroundPosition: (250 + (windowOff / 3)) + 'px 120px'});
			$('#cloud2').css({ backgroundPosition: (600 + (windowOff / 5)) + 'px 150px'});
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