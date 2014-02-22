$(document).ready(function() {
   $('.div1').mouseenter(function() {
       $(this).animate({
           height: '+=370px'
       });
	   jQuery('.button', this).fadeIn('slow');
	   jQuery('.buttonText', this).fadeIn('fast');
	   $('#left-wing').css('transform', 'rotate(5deg)').css('-ms-transform', 'rotate(5deg)').css('-webkit-transform', 'rotate(5deg)');
	   $('#right-wing').css('transform', 'rotate(-5deg)').css('-ms-transform', 'rotate(-5deg)').css('-webkit-transform', 'rotate(-5deg)');
   }).mouseleave(function() {
       $(this).animate({
           height: '-=370px'
       }); 
	   jQuery('.button', this).hide();
	   jQuery('.buttonText', this).hide();
	   $('#left-wing').css('transform', 'rotate(-5deg)').css('-ms-transform', 'rotate(-5deg)').css('-webkit-transform', 'rotate(-5deg)');
	   $('#right-wing').css('transform', 'rotate(5deg)').css('-ms-transform', 'rotate(5deg)').css('-webkit-transform', 'rotate(5deg)');
   });
});