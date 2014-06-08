var grass1H;
var grass2H;
var colorChangeTrig1 = 0;
$(document).ready(function() {
	$("html").niceScroll({
		cursorwidth: "5px",
		cursorborder: "0px",
		cursorcolor: "#2E2E2E"
	});
	$('section[data-type="background"]').each(function(){
		var $bgobj = $(this);
		updateGrass($bgobj);
		$(window).scroll(function(){
			updateGrass($bgobj);
		});
	});
});

function updateGrass($obj){
			var windowOff = $(window).scrollTop();
			var speed = $obj.data('speed');
			var grass2speed = 5;
			if($obj.attr('id') == "s1" && windowOff > 300){
				speed = 1;
				grass2speed = 0.9;
			}
			var $arti = $obj.children("article");
			var offTop = $obj.offset().top - windowOff;
			var opac;
			if($obj.attr('id') == "s1"){
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
			if($obj.attr('id') == "s1"){
				if(windowOff > 300){
					$obj.css({ backgroundPosition: '50% ' + ((400 - windowOff / 10) - (windowOff - 300) / speed) + 'px' });
					$('#grass2').css({ backgroundPosition: '50% ' + ((500 - windowOff / 5) - (windowOff - 300) / grass2speed) + 'px'});
				}else{
					$obj.css({ backgroundPosition: '50% ' + (400 - windowOff / speed) + 'px' });
					$('#grass2').css({ backgroundPosition: '50% ' + (500 - windowOff / grass2speed) + 'px'});
				}
				$('#sun').css({ "opacity": opac });
				$('.clouds').css({ "opacity": opac });
				$('#cloud1').css({ backgroundPosition: (250 + windowOff / 3) + 'px 120px'});
				$('#cloud2').css({ backgroundPosition: (600 + windowOff / 5) + 'px 150px'});
			}else if($obj.attr('id') == "s2"){
				if(windowOff >= 700){
					if(colorChangeTrig1 == 0){
						$('#sect2grad').animate({
							opacity: 1
						});
						$obj.animate({
							'background-color': '#337138'
						});
						colorChangeTrig1 = 1;
					}

				}else{
					if(colorChangeTrig1 == 1){
						$('#sect2grad').animate({
							opacity: 0
						});
						$obj.animate({
							'background-color': '#5da462'
						});
						colorChangeTrig1 = 0;
					}

				}
			}
			//$arti.css({ "opacity": opac });
			//$obj.css({ backgroundPosition: '50% ' + (400 - windowOff / speed) + 'px' });
			//$('#grass2').css({ backgroundPosition: '50% ' + (500 - windowOff / grass2speed) + 'px'});
			//console.log(opac);
			/*
			$obj.animate({
				backgroundPosition: coords
			});
			$arti.animate({
				opacity: opac
			});
			*/
		}