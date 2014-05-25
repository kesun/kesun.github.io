var SorT = 0;
var ctrlKeyDown = 0;
var sourceNode;

$(document).ready(function () {
    $(".vertex").draggable({
        containment: "parent",
        snap: true
    });
    $(document).on ("click", ".edgeLengthBox", function(){
        if($(this).is("div")){
            var inputBox = $(this).prev();
            inputBox.val($(this).text());
            $(this).hide();
            inputBox.show();
            inputBox.focus();
        }
    });
    $(document).on ("focusout", ".edgeLengthBox", function(){
        if($(this).is("input")){
            var divBox = $(this).next();
            divBox.text($(this).val());
            $(this).hide();
            divBox.show();
        }
    });
    $(document).on ("keyup", ".edgeLengthBox", function(e){
        if($(this).is("input")){
            var fixedInput = $(this).val().replace(/[^0-9\.]/g,'');
            if($(this).val() != fixedInput){
                $(this).val(fixedInput);
            }

            $(this).next().text($(this).val());
        }
        if(e.keyCode==13){
            $(this).hide();
            $(this).next().show();
        }
    });
    $('.vertex').mousedown(function (event) {
        sourceNode = $(this);
        switch (event.which) {
            case 1: // move only
                //moveNode();
                var nodeArray = new Array();
                var raw = sourceNode.attr('data');
                var expectedLine = "#solid-link-line[data='" +"," + "']";
                if($('#solid-link-line').length > 0){
                    $('#solid-link-line').attr('id', 'new-link-line');
                    var angle = getRotation($('#new-link-line'));
                    var top = $('#new-link-line').css('top');
                    var left = $('#new-link-line').css('left');
                    if($(this).attr("id") == "pointS"){
                        $('#new-link-line')
                        .css('top', $('#pointT').position().top + $('#pointT').outerWidth() / 2)
                        .css('left', $('#pointT').position().left + $('#pointT').outerHeight() / 2);
                        SorT = 1;
                    }else{
                        $('#new-link-line')
                        .css('top', $('#pointS').position().top + $('#pointS').outerWidth() / 2)
                        .css('left', $('#pointS').position().left + $('#pointS').outerHeight() / 2);
                        SorT = 2;
                    }
                    if($('#new-link-line').css('top') != top || $('#new-link-line').css('left') != left){
                        angle += 180;
                        setRotation($('#new-link-line'), angle);
                        setRotation($("#new-link-line").children($("input")), angle * -1);
                    }
                }
                if($(this).attr("id") == "pointS"){
                    SorT = 1;
                }else{
                    SorT = 2;
                }
                break;
            case 2: // add line only
                //makeLineOnly();
                break;
            case 3: // add node and line
                if($(this).attr("id") == "pointS"){
                    addLine($('#pointT'), $('#pointS'));
                }else{
                    addLine($('#pointS'), $('#pointT'));
                }
                break;
        }
        $(document).mousemove(linkMouseMoveEvent);

        $(document).bind('mouseup.link', function (e) {
         confirmLine();
     });

        $(document).bind('keydown.link', function (e) {
            switch(e.keyCode){
                case 27: // Escape
                endLinkMode();
                break;
                case 17: // Ctrl
                ctrlKeyDown = 1;
                break;
            }
        });
        $(document).bind('keyup', function (e) {
            switch(e.keyCode){
                case 17: // Ctrl
                ctrlKeyDown = 0;
                break;
            }
        });
    });
});

window.oncontextmenu = function () { return false; }

function linkMouseMoveEvent(e) {
    if(ctrlKeyDown == 1){
        var tempID = sourceNode.attr("id");

        $('<div id="pointX" class="vertex">X</div>').prependTo('.mainFrame');

    }
    if ($('#new-link-line').length > 0) {
        var lengthAngle;
        if(SorT == 1){
            lengthAngle = calcLengthAngle($('#pointS'), $('#pointT'));
        }else{
            lengthAngle = calcLengthAngle($('#pointT'), $('#pointS'));
        }
        length = lengthAngle[0];
        angle = lengthAngle[1];

        $('#new-link-line').css('height', length);
        setRotation($('#new-link-line'), angle);
        setRotation($("#new-link-line").children($("input")), angle * -1);
    }
}

/*
STRUCTURE OF A LINE DIV:
data-nodes = '["S","T"]' <== the end points of this edge

STRUCTURE OF A NODE DIV:
text() = NAME OF DIV (unique)
data-nodes = '["T","A",...]' <== there exists an edge between the current node to each of the nodes in the array
*/

function addNode(node){
    var origNodeData = node.data('nodes');
    var origNodeText = node.text();
    var newOldNodeCSS = '<div';

}

function addLine(fromNode, toNode){
    var temp1 = '[' + fromNode.text() + ',' + toNode.text() + ']';
    var temp2 = '[' + toNode.text() + ',' + fromNode.text() + ']';
    if ($('#solid-link-line["data-nodes",'+ temp1 + ']').length > 0 ||
        $('#solid-link-line["data-nodes",'+ temp2 + ']').length > 0 ||
        $('#new-link-line').length > 0)
        break;
    var dataContent = '[' + fromNode.text() + ',' + toNode.text() + ']';
    var newLineCSS = '<div id="new-link-line" data-nodes=' + dataContent + '><input type="text" class="edgeLengthBox"><div class="edgeLengthBox"></div></div>'
    $(newLineCSS).prependTo('.mainFrame');
    var lengthAngle;
    lengthAngle = calcLengthAngle(toNode, fromNode);
    setRotation($('#new-link-line'), lengthAngle[1]);
    setRotation($("#new-link-line").children($("input")), lengthAngle[1] * -1);
    $('#new-link-line')
    .css('height', lengthAngle[0])
    .css('top', fromNode.position().top + fromNode.outerWidth() / 2)
    .css('left', fromNode.position().left + fromNode.outerHeight() / 2);
}

function moveNode(node){
    var lineArray = new Array();
    var raw = sourceNode.data('nodes');
    var i = 0;
    // Extract the connected nodes, and the lines between the current node and them
    while(raw[i] != null){
        var temp1 = '[' + raw[i] + ',' + node.text() + ']';
        var temp2 = '[' + node.text() + ',' + raw[i] + ']';
        var line1 = $('#solid-link-line' + temp1);
        var line2 = $('#solid-link-line' + temp2);
        if(line1.length > 0){
            lineArray.push(line1);
        }else if(line2.length > 0){
            lineArray.push(line2);
        }
        i += 1;
    }
    moveNodeHelper(lineArray, node);
}

function moveNodeHelper(lineArray, node){
    var i = 0;
    while(i < lineArray.length){
        var curLine = lineArray[i]; // Current line
        var otherNode; // The other node of the current line
        if((curLine.data('nodes'))[0] == node.text()){
            var nodeName = (curLine.data('nodes'))[1];
            otherNode = $('.vertex:contains(' + nodeName + ')');
        }else{
            var nodeName = (curLine.data('nodes'))[0];
            otherNode = $('.vertex:contains(' + nodeName + ')');
        }
        $(curLine).attr('id', 'new-link-line'); // set the current line's status from solid to new
        var angle = getRotation(curLine);
        var top = curLine.css('top');
        var left = curLine.css('left');
        curLine
            .css('top', otherNode.position().top + otherNode.outerWidth() / 2)
            .css('left', otherNode.position().left + otherNode.outerHeight() / 2);
            SorT = 1;
        if(curLine.css('top') != top || curLine.css('left') != left){
            angle += 180;
            setRotation(curLine, angle);
            setRotation(curLine.children($("input")), angle * -1);
        }
        i += 1;
    }
}

function confirmLine() {
    $('#new-link-line').attr('id', 'solid-link-line');
    $(document).unbind('mousemove.link').unbind('click.link').unbind('keydown.link');
}

function getRotation(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
}

function calcLengthAngle(from, to){
    var originX = from.position().left + from.outerWidth() / 2;;
    var originY = from.position().top + from.outerHeight() / 2;;
    var destX = to.position().left + to.outerWidth() / 2;;
    var destY = to.position().top + to.outerWidth() / 2;;
    var length = Math.sqrt((destX - originX) * (destX - originX) + (destY - originY) * (destY - originY));
    var angle = 180 / 3.1415 * Math.acos((destY - originY) / length);
    if (destX > originX) angle *= -1;
    angle += 180;
    var result = new Array(length, angle);
    return result;
}

function setRotation(obj, angle){
    obj
    .css('-webkit-transform', 'rotate(' + angle + 'deg)')
    .css('-moz-transform', 'rotate(' + angle + 'deg)')
    .css('-o-transform', 'rotate(' + angle + 'deg)')
    .css('-ms-transform', 'rotate(' + angle + 'deg)')
    .css('transform', 'rotate(' + angle + 'deg)');
}