$(document).ready(function(){
	animate($('#circle-outer'), 2000, 0, 0.4, 0.0, 80, 130, "#510022", "#FFFFFF");
	animate($('#circle-inner'), 1000, 1000, 1, 0.5, 90, 125, "#510022", "#510022");
});

function animate(id, speed, del, initOpa, finalOpa, initDia, finalDia, initColor, finalColor){
	id.delay(del).animate({
		width: finalDia + "px",
		height: finalDia + "px",
		"margin-top": -1 * finalDia / 2 + "px",
		"margin-left": -1 * finalDia / 2 + "px",
		"border-radius": finalDia / 2 + "px",
		"background-color": finalColor,
		opacity: finalOpa
	}, speed, "easeInOutCubic", function(){
		id.css('background-color', initColor)
			.css('width', initDia + "px")
			.css('height', initDia + "px")
			.css('opacity', initOpa)
			.css('border-radius', initDia / 2 + "px")
			.css('margin-top', -1 * initDia / 2 + "px")
			.css('margin-left', -1 * initDia / 2 + "px");
		animate(id, speed, del, initOpa, finalOpa, initDia, finalDia, initColor, finalColor);
	});
}