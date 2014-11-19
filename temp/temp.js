var double = 0;
var curTop;
var curTopLen;
var maxLeft = 600;

var colourCode;

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
      colourCode = Math.floor((Math.random() * 3) + 1);
      curTop = $("#obj").css("top");
      curTopLen = curTop.length;
      curTop = curTop.substring(0, curTopLen-2);
      setbullet(curTop);
    }
  });
});

function ballJump(){
  $("#spriteRearLeg").css("top", "32px")
          .css("left", "-4px")
          .css("width", "20px")
          .css("height", "6px");
        $("#spriteFrontLeg").css("top", "32px")
          .css("left", "34px")
          .css("width", "20px")
          .css("height", "6px");
  $("#obj").animate({ top: "-=200px" }, 400, "easeOutQuad", function(){
    if(double == 0){
      $("#obj").animate({ top: 400 }, 400, "easeInQuad", function(){
        $("#spriteRearLeg").css("top", "30px")
          .css("left", "10px")
          .css("width", "6px")
          .css("height", "20px");
        $("#spriteFrontLeg").css("top", "30px")
          .css("left", "34px")
          .css("width", "6px")
          .css("height", "20px");
      });
    }else if(double == 1){
      var animateTime = (400 - curTop + 200) / 200 * 400;
      if(animateTime > 400){
        animateTime = 400 + Math.pow((animateTime - 400), 0.8);
      }
      $("#obj").animate({ top: 400 }, animateTime, "easeInQuad", function(){
        double = 0;
        $("#spriteRearLeg").css("top", "30px")
          .css("left", "10px")
          .css("width", "6px")
          .css("height", "20px");
        $("#spriteFrontLeg").css("top", "30px")
          .css("left", "34px")
          .css("width", "6px")
          .css("height", "20px");
      });
    }
  });
}

function setbullet(height){
  if(height <= 500){
    var bulletColour;
    if(colourCode == 1){
      bulletColour = "#F7819F";
    }else if(colourCode == 2){
      bulletColour = "#F5DA81";
    }else if(colourcode == 3){
      bulletColour = "#81DAF5";
    }
    var res = $("<div class='bullet' style='background-color:" + bulletColour + "; top: " + (height - 4 + 25) + "px; left: 60px;'></div>").appendTo($('body'));
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
    bulletExplode(obj, curLeft);
  }
}

function bulletExplode(bullet, curLeft){
  var spark1;
  var spark2;
  var spark3;
  var spark4;

  setTimeout(function(){
    var origTop = bullet.css("top");
    origTop = parseInt(origTop.substring(0, origTop.length - 2));
    setTimeout(function(){
      bullet.remove();
      spark1 = $("<div class='spark1' style='top: " + (origTop - 8) + "px; left: " + (curLeft + 12 - 4) + "px;'></div>").appendTo($('body'));
      spark2 = $("<div class='spark1' style='top: " + (origTop + 8) + "px; left: " + (curLeft + 12 - 4) + "px;'></div>").appendTo($('body'));
      spark3 = $("<div class='spark1' style='top: " + (origTop + 0) + "px; left: " + (curLeft + 12 - 12) + "px;'></div>").appendTo($('body'));
      spark4 = $("<div class='spark1' style='top: " + (origTop + 0) + "px; left: " + (curLeft + 12 + 4) + "px;'></div>").appendTo($('body'));
      setTimeout(function(){
        spark1.addClass('spark2').removeClass('spark1').css("top", "+=2px").css("left", "+=2px");
        spark2.addClass('spark2').removeClass('spark1').css("top", "+=2px").css("left", "+=2px");
        spark3.addClass('spark2').removeClass('spark1').css("top", "+=2px").css("left", "+=2px");
        spark4.addClass('spark2').removeClass('spark1').css("top", "+=2px").css("left", "+=2px");
        setTimeout(function(){
          spark1.remove();
          spark2.remove();
          spark3.remove();
          spark4.remove();
        }, 60);
      }, 60);
    }, 60);
  }, 10);
}
