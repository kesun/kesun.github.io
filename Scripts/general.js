$(document).ready(function() {
   $('.div1').mouseenter(function() {
       $(this).animate({
           height: '+=370px'
       });
	   jQuery('.button', this).fadeIn('slow');
   });
   $('.div1').mouseleave(function() {
       $(this).animate({
           height: '-=370px'
       }); 
	   jQuery('.button', this).hide();
   });
   $('.div1').click(function() {
       $(this).toggle(1000);
   }); 
});