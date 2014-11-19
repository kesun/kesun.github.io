var double = 0;
var curTop;
var curTopLen;
var maxLeft = 600;

$(document).ready(function(){
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
        //console.log("not animated");
        if(double < 1){
          $("#obj").stop();
          ballJump();
        }
      }else if(double == 0){
        //console.log("animated");
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
  $("#obj").animate({ top: "-=200px" }, 400, "easeOutQuad", function(){
    if(double == 0){
      $("#obj").animate({ top: 400 }, 400, "easeInQuad");
    }else if(double == 1){
      var animateTime = (400 - curTop + 200) / 200 * 400;
      if(animateTime > 400){
        animateTime = 400 + Math.sqrt(animateTime - 400);
      }
      $("#obj").animate({ top: 400 }, animateTime, "easeInQuad", function(){
        double = 0;
      });
    }
  });
}

function setbullet(height){
  if(height <= 500){
    var res = $("<div class='bullet' style='top: " + (height - 4 + 25) + "px; left: 60px;'></div>").appendTo($('body'));
    animateBullet(res, 60);
  }
  //console.log(res);
}

function animateBullet(obj, curLeft){
  if(curLeft < maxLeft){
    obj.css("left", curLeft);
    setTimeout(function(){
      animateBullet(obj, curLeft + 15);
    }, 50);
  }else{
    obj.remove();
  }
}
