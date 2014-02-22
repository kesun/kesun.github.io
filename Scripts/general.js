$(document).ready(function() {
   $('.div1').mouseenter(function() {
       $(this).animate({
           height: '+=370px'
       });
	   jQuery('.button', this).fadeIn('slow');
	   jQuery('.buttonText', this).fadeIn('fast');
	   $('#left-wing').rotate({animateTo:5});
	   $('#right-wing').rotate({animateTo:-5});
   }).mouseleave(function() {
       $(this).animate({
           height: '-=370px'
       }); 
	   jQuery('.button', this).hide();
	   jQuery('.buttonText', this).hide();
	   $('#left-wing').rotate({animateTo:-5});
	   $('#right-wing').rotate({animateTo:5});
   });
});