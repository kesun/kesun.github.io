$(document).ready(function(){
  var space = false;
  $(document).keyup(function(event) {
    if (event.keyCode == 32) {
      space = false;
    }
  }).keydown(function(event) {
    if (event.keyCode == 32) {
      console.log("AYAYAYAA");
      space = true;
      $("#obj").animate({ top: 100 }, 400, "easeOutSine")
        .animate({ top: 200 }, 400, "easeInSine");
    }
  });
});
