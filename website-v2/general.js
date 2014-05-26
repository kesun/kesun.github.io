$(document).ready(function(){
	animate($('#circle-outer'), 2000, 0, 80, 130, "#FFFFFF", "#510022");
	animate($('#circle-inner'), 1000, 1000, 100, 120, "#510022", "#510022");
});

function animate(id, speed, del, initDia, finalDia, initColor, finalColor){
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
		animate(id, speed, del, initDia, finalDia, initColor, finalColor);
	});
}