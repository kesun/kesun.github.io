$(document).ready(function(){
	var $sections = $('.section');
	var shortyLogoPanel = false;
	init($sections);
	for(var i = 0; i < $sections.length; i++){
		var colour = "hsla(" + Math.floor(Math.random() * 360) + ", 60%, 70%, 1)";
		$($sections[i]).css('background-color', colour);
	}
	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		if(scroll > 100){
			if(!shortyLogoPanel){
				shortyLogoPanel = true;
				$('.topPannel').animate({
					height: 50
				}, 'fast');
				$('.logo').animate({
					'font-size': '1.5em'
				}, 'fast');
			}
		}else{
			if(shortyLogoPanel){
				shortyLogoPanel = false;
				$('.topPannel').animate({
					height: 100
				}, 'fast');
				$('.logo').animate({
					'font-size': '1.8em'
				}, 'fast');
			}
		}
	});

	function init($sections){
		var $contentWrappers = $('.contentWrapper');
		for(var i = 0; i < $contentWrappers.length; i++){
			if(i == 0){
				$($contentWrappers[i]).css('padding-top', '+=100px');
			}else{
				$($contentWrappers[i]).css('padding-top', '+=50px');
			}
		}
		var scroll = $(window).scrollTop();
		if(scroll > 100){
			if(!shortyLogoPanel){
				shortyLogoPanel = true;
				$('.topPannel').css('height', '50px');
				$('.logo').css('font-size', '1.5em');
			}
		}else{
			if(shortyLogoPanel){
				shortyLogoPanel = false;
				$('.topPannel').css('height', '100px');
				$('.logo').css('font-size', '1.8em');
			}
		}
	}
});