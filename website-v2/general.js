$(document).ready(function(){
	var expanded = 0;
	var about = 0;
	var mouseIn = 0;
	animateCircle($('#circle-outer'), 2000, 500, 74, 120, "#FFFFFF", "#2E111D");
	//animateCircle($('#circle-inner'), 1000, 1000, 100, 120, "#2E111D", "#2E111D");
	animateHeart($('#heart-big'));
	$('#orb-back').mouseover(function(){
		mouseIn = 1;
	});
	$('#orb-back').mouseout(function(){
		mouseIn = 0;
	});
	$('#heart-big').mouseover(function(){
		var rad = 30 + "px";
		if($('#orb-back').is(':animated')){
			$('#orb-back').finish();
		}
		$('#orb-back').animate({
			width: 60 + "px",
			height: 60 + "px",
			"margin-top": -38 + "px",
			"margin-left": "-" + rad,
			"border-radius": rad,
			"border-top-left-radius": rad,
			"border-top-right-radius": rad,
			"border-bottom-right-radius": rad,
			"border-bottom-left-radius": rad
		}, 500, "easeInOutCubic");
	});
	$('#heart-big').mouseout(function(){
		if(expanded == 0){
			var rad = 25 + "px";
			$('#orb-back').animate({
				width: 50 + "px",
				height: 50 + "px",
				"margin-top": -33 + "px",
				"margin-left": "-" + rad,
				"border-radius": rad,
				"border-top-left-radius": rad,
				"border-top-right-radius": rad,
				"border-bottom-right-radius": rad,
				"border-bottom-left-radius": rad
			}, 500, "easeInOutCubic");
		}
	});
	$('#orb-back').click(function(){
		if(expanded == 0){
			expanded = 1;
			var rad = 0 + "px";
			$('#heart-big').toggle();
			$('#text-small').toggle();
			$('#orb-back').animate({
				width: 400 + "px",
				height: 100 + "%",
				"top": 0,
				"margin-top": rad,
				"margin-left": -200 + "px",
				"border-radius": rad,
				"border-top-left-radius": rad,
				"border-top-right-radius": rad,
				"border-bottom-right-radius": rad,
				"border-bottom-left-radius": rad,
				"background-color": "rgba(105, 64, 78, 1)"
			}, function(){
				$('#content-menu').fadeIn();
			});
		}
	});
	$('body').click(function(){
		var id;
		if(mouseIn == 0 && expanded == 1){
			if($('.long-button').is(':animated')){
				$('.long-button').finish();
			}
			if($('#orb-back').is(':animated')){
				$('#orb-back').finish();
				$('#content-about').hide();
				$('#content-menu').hide();
			}
			if($('#content-menu').is(':animated')){
				$('#content-menu').finish();
			}
			if($('#content-about').is(':animated')){
				$('#content-about').finish();
			}
			if(about == 1){
				id = $('#content-about');
			}else{
				id = $('#content-menu');
			}
			id.fadeOut(function(){
				var rad = 25 + "px";
				$('#orb-back').animate({
					width: 50 + "px",
					height: 50 + "px",
					"background-color": "rgba(225, 225, 225, 0.3)",
					"top": 50 + "%",
					"margin-top": -33 + "px",
					"margin-left": "-" + rad,
					"border-radius": rad,
					"border-top-left-radius": rad,
					"border-top-right-radius": rad,
					"border-bottom-right-radius": rad,
					"border-bottom-left-radius": rad
				}, 500, "easeInOutCubic", function(){
					expanded = 0;
					if(about == 1){
						about = 0;
					}
					$('#heart-big').toggle();
					$('#text-small').toggle();
				});
			});
		}
	});
	$('.long-button').mouseover(function(){
		if($(this).is(':animated')){
			$(this).finish();
		}
		var id = $(this).attr("id");
		if(id == "github"){
			$(this).animate({
				"background-color": "#A461AB"
			}, "fast");
		}else if(id == "gallery"){
			$(this).animate({
				"background-color": "#6192AB"
			}, "fast");
		}else if(id == "blog"){
			$(this).animate({
				"background-color": "#7CAB61"
			}, "fast");
		}else if(id == "about"){
			$(this).animate({
				"background-color": "#AB8561"
			}, "fast");
		}
	});
	$('.long-button').click(function(){
		var id = $(this).attr("id");
		if(id == "github"){
			window.open("https://github.com/kesun", '_blank');
		}else if(id == "gallery"){
			window.open("http://snow365.me", '_blank');
		}else if(id == "blog"){
			window.open("http://kesun.ca/blog", '_blank');
		}else if(id == "about"){
			about = 1;
			$('#content-menu').fadeOut(function(){
				$('#content-about').fadeIn();
			});
		}
	});
	$('.long-button').mouseout(function(){
		$(this).animate({
			"background-color": "#AB617B"
		}, "fast");
	});
	$('#about-close').click(function(){
		about = 0;
		$('#content-about').fadeOut(function(){
			$('#content-menu').fadeIn();
		});
	});
});

function animateCircle(id, speed, del, initDia, finalDia, initColor, finalColor){
	var finalRad = finalDia / 2 + "px";
	var initRad = initDia / 2 + "px";
	id.delay(del).animate({
		width: finalDia + "px",
		height: finalDia + "px",
		"margin-top": "-" + finalRad,
		"margin-left": "-" + finalRad,
		"border-radius": finalRad,
		"border-top-left-radius": finalRad,
		"border-top-right-radius": finalRad,
		"border-bottom-right-radius": finalRad,
		"border-bottom-left-radius": finalRad,
		"background-color": finalColor
	}, speed, "easeInOutCubic", function(){
		id.css('background-color', initColor)
			.css('width', initDia + "px")
			.css('height', initDia + "px")
			.css('border-radius', initRad)
			.css('border-top-left-radius', initRad)
			.css('border-top-right-radius', initRad)
			.css('border-bottom-right-radius', initRad)
			.css('border-bottom-left-radius', initRad)
			.css('margin-top', "-" + initRad)
			.css('margin-left', "-" + initRad);
		animateCircle(id, speed, del, initDia, finalDia, initColor, finalColor);
	});
}

function animateHeart(heart){
	heart.animate({
		opacity: 0.2
	}, 800, "easeInOutCubic", function(){
		heart.animate({
			opacity: 0.5
		}, 1500, "easeInOutCubic", function(){
			animateHeart(heart);
		})
	});
}