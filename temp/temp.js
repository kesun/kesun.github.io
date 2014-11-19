var double = 0;
var curTop;
var curTopLen;

$(document).ready(function(){
  setbullet(400);
  var maxTop = 100;
  var space = false;
  var jumpNum = 0;
  var halt = 0;
  $(document).keyup(function(event) {
    if (event.keyCode == 32) {
      space = false;
    }
  }).keydown(function(event) {
    curTop = $("#obj").css("top");
    curTopLen = curTop.length;
    curTop = curTop.substring(0, curTopLen-2);

    if (event.keyCode == 32) {
      space = true;
      if (!$("#obj").is(':animated')) {
        console.log("not animated");
        if(double < 1){
          $("#obj").stop();
          ballJump();
        }
      }else if(double == 0){
        console.log("animated");
        double = 1;
        $("#obj").stop();
        ballJump();
      }
    }
  });

  $(document).click(function(event) {
    if(event.which == 1){
      curTop = $("#obj").css("top");
      curTopLen = curTop.length;
      curTop = curTop.substring(0, curTopLen-2);
      setbullet(curTop);
    }
  });
});

function ballJump(){
  $("#obj").animate({ top: "-=200px" }, 400, "easeOutSine", function(){
    if(double == 0){
      $("#obj").animate({ top: 400 }, 400, "easeInSine");
    }else if(double == 1){
      $("#obj").animate({ top: 400 }, (400 - curTop + 200) / 200 * 400, "easeInSine", function(){
        double = 0;
      });
    }
  });
}

function setbullet(height){
  if(height <= 500){
    var res = $("<div class='bullet' style='top: " + (height + 25 - 4) + "px; left: 60px;'></div>").appendTo($('body'));
    console.log(res.css("top"));
  }
  //console.log(res);
}
