var grass1H;
var grass2H;
$(document).ready(function() {
	$("html").niceScroll({
		cursorwidth: "5px",
		cursorborder: "0px",
		cursorcolor: "#2E2E2E"
	});
	//updateGrass();
	$('section[data-type="background"]').each(function(){
		var $bgobj = $(this);
		$(window).scroll(function(){
			var windowOff = $(window).scrollTop();
			var speed = $bgobj.data('speed');
			var grass2speed = 5;
			if($bgobj.attr('id') == "s1" && windowOff > 300){
				speed = 1;
				grass2speed = 0.9;
			}
			var $arti = $bgobj.children("article");
			var offTop = $bgobj.offset().top - windowOff;
			var opac;
			if($bgobj.attr('id') == "s1"){
				if(offTop < -300){
					opac = 1 + (offTop + 300) / 150;
				}else{
					opac = 1;
				}
			}
			if(opac < 0){
				opac = 0;
			}else if(opac > 1){
				opac = 1;
			}
			console.log(windowOff);
			if($bgobj.attr('id') == "s1"){
				if(windowOff > 300){
					$bgobj.css({ backgroundPosition: '50% ' + (grass1H - (windowOff - 300) / speed) + 'px' });
					$('#grass2').css({ backgroundPosition: '50% ' + (grass2H - (windowOff - 300) / grass2speed) + 'px'});
				}else{
					grass1H = 400 - windowOff / speed;
					grass2H = 500 - windowOff / grass2speed;
					$bgobj.css({ backgroundPosition: '50% ' + grass1H + 'px' });
					$('#grass2').css({ backgroundPosition: '50% ' + grass2H + 'px'});
				}
				$('#sun').css({ "opacity": opac });
				$('.clouds').css({ "opacity": opac });
				$('#cloud1').css({ backgroundPosition: (250 + windowOff / 3) + 'px 120px'});
				$('#cloud2').css({ backgroundPosition: (600 + windowOff / 5) + 'px 150px'});
			}
			//$arti.css({ "opacity": opac });
			//$bgobj.css({ backgroundPosition: '50% ' + (400 - windowOff / speed) + 'px' });
			//$('#grass2').css({ backgroundPosition: '50% ' + (500 - windowOff / grass2speed) + 'px'});
			//console.log(opac);
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
/*
function updateGrass(){
	$('section[data-type="background"]').each(function(){
		var $bgobj = $(this);
			var windowOff = $(window).scrollTop();
			var speed = $bgobj.data('speed');
			var grass2speed = 5;
			if($bgobj.attr('id') == "s1" && windowOff > 300){
				speed = 1;
				grass2speed = 0.9;
			}
			var $arti = $bgobj.children("article");
			var offTop = $bgobj.offset().top - windowOff;
			var opac;
			if($bgobj.attr('id') == "s1"){
				if(offTop < -300){
					opac = 1 + (offTop + 300) / 150;
				}else{
					opac = 1;
				}
			}
			if(opac < 0){
				opac = 0;
			}else if(opac > 1){
				opac = 1;
			}
			if($bgobj.attr('id') == "s1"){
				if(windowOff > 300){
					$bgobj.css({ backgroundPosition: '50% ' + (grass1H - (windowOff - 300) / speed) + 'px' });
					$('#grass2').css({ backgroundPosition: '50% ' + (grass2H - (windowOff - 300) / grass2speed) + 'px'});
				}else{
					grass1H = 400 - windowOff / speed;
					grass2H = 500 - windowOff / grass2speed;
					$bgobj.css({ backgroundPosition: '50% ' + grass1H + 'px' });
					$('#grass2').css({ backgroundPosition: '50% ' + grass2H + 'px'});
				}
				$('#sun').css({ "opacity": opac });
				$('.clouds').css({ "opacity": opac });
				$('#cloud1').css({ backgroundPosition: (250 + windowOff / 3) + 'px 120px'});
				$('#cloud2').css({ backgroundPosition: (600 + windowOff / 5) + 'px 150px'});
			}
	}
}
*/