$(document).ready(function() {
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
		});
	});
});

$(function() {
  var eTop = $('element').offset().top; //get the offset top of the element
  console.log(eTop - $(window).scrollTop()); //position of the ele w.r.t window

  $(window).scroll(function() { //when window is scrolled
     console.log(eTop  - $(window).scrollTop());
  });
});