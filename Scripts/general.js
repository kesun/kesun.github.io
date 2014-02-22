$(document).ready(function() {
   $('.div1').mouseenter(function() {
       $(this).animate({
           height: '+=370px'
       });
	   jQuery('.button', this).fadeIn('slow');
	   jQuery('.buttonText', this).fadeIn('fast');
	   $('#left-wing').rotate({animateTo:10, duration: 200});
	   $('#right-wing').rotate({animateTo:-10, duration: 200});
   }).mouseleave(function() {
       $(this).animate({
           height: '-=370px'
       }); 
	   jQuery('.button', this).hide();
	   jQuery('.buttonText', this).hide();
	   $('#left-wing').rotate({animateTo:-10});
	   $('#right-wing').rotate({animateTo:10});
   });
});