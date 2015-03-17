var double = 0;
var curTop;
var curTopLen;
var curLeft;
var curLeftLen;
var maxLeft = 0;
var maxHeight = 0;
var movingLeft = 0;
var movingRight = 0;
var hStop = false;
var vStop = false;
var leftKeyDown = false;
var rightKeyDown = false;

var makeNewRainbow = true;
var rainbowStartingTop = 0;
var sceneSpeed = 100;

var rainbows = [];

var colourCode;

function horizontalStop(fx, prop) {
    //stop height animation by external "event" -> if button was clicked
    if (hStop && prop.prop === "left") {

        //stop animation. start == end means nothing to be done anymore
        prop.start = prop.end = prop.now;

        //if you just want to stop height and then don't anything else with the step callback
        //you can do the following to save a few cpu cycles
        //prop.options.step = null;

        hStop = false;
        return;
    }
}

function verticalStop(fx, prop) {
    //stop height animation by external "event" -> if button was clicked
    if (hStop && prop.prop === "top") {

        //stop animation. start == end means nothing to be done anymore
        prop.start = prop.end = prop.now;

        //if you just want to stop height and then don't anything else with the step callback
        //you can do the following to save a few cpu cycles
        //prop.options.step = null;

        vStop = false;
        return;
    }
}

$(document).ready(function(){
  maxHeight = $('#mainFrame').height() - $('#obj').height();
  maxLeft = $('#mainFrame').width() - $('#obj').width();
  rainbowStartingTop = Math.floor((Math.random() * (maxHeight - 70)) + 1);
  $('#obj').css('top', maxHeight);
  $('#obj').css('left', 0);
  var maxTop = 100;
  var space = false;
  var jumpNum = 0;
  var halt = 0;

  animateRainbow();

  $(document).keyup(function(event) {
    if (event.keyCode == 87) {
      vStop = true;
      console.log("JUMP up");
    }
    if (event.keyCode == 65) {
      hStop = true;
      leftKeyDown = false;
      console.log("LEFT up");
    }
    if (event.keyCode == 68) {
      hStop = true;
      rightKeyDown = false;
      console.log("RIGHT up");
    }
  }).keydown(function(event) {
    curTop = $("#obj").css("top");
    curTopLen = curTop.length;
    curTop = curTop.substring(0, curTopLen-2);

    if (event.keyCode == 87) {
      space = true;
      console.log("JUMP down");
      if ($("#obj").css("top") == maxHeight) {
        //console.log("not animated");
        //console.log($("#obj").css("top"));
        if(double < 1){
          $("#obj").stop();
          ballJump();
        }
      }else if(double == 0){
        //console.log("animated");
        //console.log($("#obj").css("top"));
        double = 1;
        //$("#obj").stop();
        ballJump();
      }
    }

    if (event.keyCode == 65) {
      if(rightKeyDown == false){
        leftKeyDown = true;
        console.log("LEFT down");
        curLeft = $("#obj").css("left");
        if(curLeft == "auto") curLeft = "0px";
        curLeftLen = curLeft.length;
        curLeft = curLeft.substring(0, curLeftLen-2);
        if(curLeft > 0){
          //console.log("moving to the left");
          $("#obj").animate({ left: 0 }, {duration: curLeft * 2, queue: false, step: horizontalStop, easing: "linear"});
        }
      }
      
    }

    if (event.keyCode == 68) {
      if(leftKeyDown == false){
        rightKeyDown = true;
        console.log("RIGHT down");
        curLeft = $("#obj").css("left");
        if(curLeft == "auto") curLeft = "0px";
        curLeftLen = curLeft.length;
        curLeft = curLeft.substring(0, curLeftLen-2);
        if(curLeft < maxLeft){
          //if(movingLeft == 1)
          //console.log("moving to the right");
          $("#obj").animate({ left: maxLeft }, {duration: (maxLeft - curLeft) * 2, queue: false, step: horizontalStop, easing: "linear"});
        }
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
  $("#obj").animate({ top: "-=200px" }, {duration: maxHeight, queue: false, step: verticalStop, easing: "easeOutQuad", complete: function(){
    if(double == 0){
      console.log("normal down");
      $("#obj").animate({ top: maxHeight }, {duration: maxHeight, queue: false, easing: "easeInQuad", complete: function(){
        $("#spriteRearLeg").css("top", "30px")
          .css("left", "10px")
          .css("width", "6px")
          .css("height", "20px");
        $("#spriteFrontLeg").css("top", "30px")
          .css("left", "34px")
          .css("width", "6px")
          .css("height", "20px");
      }});
    }else if(double == 1){
      console.log("double down");
      var animateTime = (maxHeight - curTop + 200) / 200 * maxHeight;
      if(animateTime > maxHeight){
        animateTime = maxHeight + Math.pow((animateTime - maxHeight), 0.8);
      }
      $("#obj").animate({ top: maxHeight }, {duration: animateTime, queue: false, easing: "easeInQuad", complete: function(){
        double = 0;
        $("#spriteRearLeg").css("top", "30px")
          .css("left", "10px")
          .css("width", "6px")
          .css("height", "20px");
        $("#spriteFrontLeg").css("top", "30px")
          .css("left", "34px")
          .css("width", "6px")
          .css("height", "20px");
      }});
    }
  }});
}

function setbullet(height){
  if(height <= maxHeight){
    var bulletColour;
    if(colourCode == 1){
      bulletColour = "#F7819F";
    }else if(colourCode == 2){
      bulletColour = "#F5DA81";
    }else if(colourCode == 3){
      bulletColour = "#81DAF5";
    }
    var left = $('#obj').css("left");
    if(left == "auto") left = "0px";
    var leftLen = left.length;
    left = parseInt(left.substring(0, leftLen-2)) + 60;
    var res = $("<div class='bullet' style='background-color:" + bulletColour + "; top: " + (height - 4 + 25) + "px; left: " + left + "px;'></div>").appendTo($('body'));
    animateBullet(res, left);
  }
  //console.log(res);
}

function animateBullet(obj, left){
  if(left < maxLeft){
    obj.css("left", left);
    setTimeout(function(){
      animateBullet(obj, left + 15);
    }, 50);
  }else{
    bulletExplode(obj, left);
  }
}

function bulletExplode(bullet, left){
  var spark1;
  var spark2;
  var spark3;
  var spark4;

  setTimeout(function(){
    var origTop = bullet.css("top");
    origTop = parseInt(origTop.substring(0, origTop.length - 2));
    setTimeout(function(){
      bullet.remove();
      spark1 = $("<div class='spark1' style='top: " + (origTop - 8) + "px; left: " + (left + 12 - 4) + "px;'></div>").appendTo($('body'));
      spark2 = $("<div class='spark1' style='top: " + (origTop + 8) + "px; left: " + (left + 12 - 4) + "px;'></div>").appendTo($('body'));
      spark3 = $("<div class='spark1' style='top: " + (origTop + 0) + "px; left: " + (left + 12 - 12) + "px;'></div>").appendTo($('body'));
      spark4 = $("<div class='spark1' style='top: " + (origTop + 0) + "px; left: " + (left + 12 + 4) + "px;'></div>").appendTo($('body'));
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

function animateRainbow(){
  if(makeNewRainbow == true){
    var rainbow = $('<div class="rainbowPack" style="top:' + rainbowStartingTop + 'px; left:' + $('#mainFrame').width() + 'px" >' +
          '<div class="rainbowSingle" style="background-color:#FFCDCD;"></div>' +
          '<div class="rainbowSingle" style="background-color:#FFE8CD;"></div>' +
          '<div class="rainbowSingle" style="background-color:#FFFFCD;"></div>' +
          '<div class="rainbowSingle" style="background-color:#CDFFCF;"></div>' +
          '<div class="rainbowSingle" style="background-color:#CDFFFF;"></div>' +
          '<div class="rainbowSingle" style="background-color:#CDCDFF;"></div>' +
          '<div class="rainbowSingle" style="background-color:#F9CDFF;"></div>' +
        '</div>');
    rainbow.appendTo($('#backgroundFrame'));
    rainbows[rainbows.length] = rainbow;
    makeNewRainbow = false;
  }
  console.log(rainbows);
  for(var i = 0; i < rainbows.length; i++){
    var rainbowObj = rainbows[i];
    var rainbowLeft = parseInt(rainbowObj.css('left').substring(0, rainbowObj.css('left').length -2));
    if(rainbowLeft + 70 < 0){
      rainbows.splice(i, 1);
    }
    rainbowObj.css('left', rainbowLeft - 10);
    if(i == rainbows.length - 1 && rainbowLeft + 60 == $('#backgroundFrame').width()){
      var rainbowTop = parseInt(rainbowObj.css('top').substring(0, rainbowObj.css('top').length -2));
      if(Math.floor((Math.random() * 2) + 1) == 1){
        if(rainbowTop >= 2){
          rainbowStartingTop -= 2;
        }else{
          rainbowStartingTop += 2;
        }
      }else{
        if(rainbowTop <= $('#backgroundFrame').height() - 72){
          rainbowStartingTop += 2;
        }else{
          rainbowStartingTop -= 2;
        }
      }
      makeNewRainbow = true;
    }
  }

  setTimeout(animateRainbow, 100);
}
