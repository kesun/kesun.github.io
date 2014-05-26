$(document).ready(function(){
	var expanded = 0;
	var mouseIn = 0;
	animateCircle($('#circle-outer'), 2000, 0, 80, 130, "#FFFFFF", "#2E111D");
	animateCircle($('#circle-inner'), 1000, 1000, 100, 120, "#2E111D", "#2E111D");
	animateHeart($('#heart-big'));
	$('#orb-back').mouseover(function(){
		mouseIn = 1;
	});
	$('#orb-back').mouseout(function(){
		mouseIn = 0;
	});
	$('#heart-big').mouseover(function(){
		$('#orb-back').animate({
			width: 60 + "px",
			height: 60 + "px",
			"margin-top": -37 + "px",
			"margin-left": -30 + "px",
			"border-radius": 30 + "px",
		}, 500, "easeInOutCubic");
	});
	$('#heart-big').mouseout(function(){
		if(expanded == 0){
			$('#orb-back').animate({
				width: 50 + "px",
				height: 50 + "px",
				"margin-top": -32 + "px",
				"margin-left": -25 + "px",
				"border-radius": 25 + "px",
			}, 500, "easeInOutCubic");
		}
	});
	$('#orb-back').click(function(){
		if(expanded == 0){
			expanded = 1;
			$('#heart-big').toggle();
			$('#orb-back').animate({
				width: 400 + "px",
				height: 100 + "%",
				"top": 0,
				"margin-top": 0 + "px",
				"margin-left": -200 + "px",
				"border-radius": 0 + "px",
				"background-color": "rgba(225, 225, 225, 1)"
			});
		}
	});
	$('body').click(function(){
		if(mouseIn == 0 && expanded == 1){
			$('#orb-back').animate({
				width: 50 + "px",
				height: 50 + "px",
				"background-color": "rgba(225, 225, 225, 0.3)",
				"top": 50 + "%",
				"margin-top": -32 + "px",
				"margin-left": -25 + "px",
				"border-radius": 25 + "px",
			}, 500, "easeInOutCubic", function(){
				expanded = 0;
				$('#heart-big').toggle();
			});
		}
	});
});

function animateCircle(id, speed, del, initDia, finalDia, initColor, finalColor){
	id.delay(del).animate({
		width: finalDia + "px",
		height: finalDia + "px",
		"margin-top": -1 * finalDia / 2 + "px",
		"margin-left": -1 * finalDia / 2 + "px",
		"border-radius": finalDia / 2 + "px",
		"background-color": finalColor
	}, speed, "easeInOutCubic", function(){
		id.css('background-color', initColor)
			.css('width', initDia + "px")
			.css('height', initDia + "px")
			.css('border-radius', initDia / 2 + "px")
			.css('margin-top', -1 * initDia / 2 + "px")
			.css('margin-left', -1 * initDia / 2 + "px");
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