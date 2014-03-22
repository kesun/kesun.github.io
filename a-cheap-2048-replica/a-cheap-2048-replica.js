var x;
var y;

var tempID = 0;
var change = 0;
var numRow = 4;
var numCol = 4;
var alive = 0;
var winner = 0;
var loser = 0;

/*
function testSpawn(){
	$("#12").append("<p>2</p>");
	$("#21").append("<p>2</p>");
	$("#22").append("<p>2</p>");
	$("#24").append("<p>2</p>");
	$("#33").append("<p>2</p>");
	$("#42").append("<p>2</p>");
	$("#43").append("<p>2</p>");
}

function test(){
	$("body").append("<p>Alive: "+alive+"; Winner: "+winner+"; Loser: "+loser+"</p>");
}
*/

function checkWinner(){	// returns 1 if there's winner, 0 if not (doesn't mean losing)
	var temp;
	for(var i = 1; i <= numRow; i++){
		for(var j = 1; j <= numCol; j++){
			temp = "#" + i + j;

			if($(temp).is(":empty")){	// if block is empty

				alive = 1;	// game is alive

			}else if($(temp).text() == "2048"){	// if there is 2048
				winner = 1;	// there is a winner
				return 1;
			}else{	// if block is filled with non-2048 (implicitly less than 2048)
				if(i < numRow && j < numCol){	// check for neighbouring pairs
					var rowNei = "#"+i+(j+1);
					var colNei = "#"+(i+1)+j;
					var cur = $(temp).text();
					
					rowNei = $(rowNei).text();
					colNei = $(colNei).text();
					
					if(cur == rowNei || cur == colNei){	// if a pair exists

						alive = 1;	// game is alive

					}
				}
			}
		}
	}
	return 0;
}

function declareWinner(){
	$("body").append("<p>We have a winner!</p>");
}

function declareLoser(){
	$("body").append("<p>You are out of moves!</p>");
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCord(){
	x = getRandomInt(1,4);
	y = getRandomInt(1,4);
	return "#" + x + y;
}

function spawn(){
	tempID = getCord();
	while(!($(tempID).is(":empty"))){
		tempID = getCord();
	}
	
	$(tempID).append("<p>2</p>");
}

function moveValueTo(origID, newID, value){
	$("p", newID).remove("p");
	$(newID).append("<p>" + value + "</p>");
	$("p", origID).remove("p");
}

function moveUp(){
	var targetRow = 1;
	var prevValue = 0;
	var prevRow = 0;
	
	for(var col = 1; col <= numCol; col++){
		targetRow = 1;
		prevValue = 0;
		prevRow = 0;
		
		for(var row = 1; row <= numRow; row++){
			var curID = "#" + row + col;
			if(!($(curID).is(":empty"))){	// If box not empty
				if(prevValue == 0){	// If there is no unused previous value
					prevValue = $(curID).text();	// Flag cur value
					prevRow = targetRow;	// Flag cur row
					if(targetRow < row){
						moveValueTo(curID, "#" + targetRow + col, prevValue);
						change = 1;
					}
					targetRow++;
				}else{	// If there is unused previous value
					if(prevValue == $(curID).text()){	// If prev value == cur value
						var sum = Number(prevValue) + Number($(curID).text());
						moveValueTo(curID, "#" + prevRow + col, sum);
						prevValue = 0;
						prevRow = 0;
						change = 1;
					}else{	// If prev value != cur value
						row--;
						prevValue = 0;
						prevRow = 0;
					}
				}
			}
		}
	}
}

function moveDown(){
	var targetRow = numRow;
	var prevValue = 0;
	var prevRow = 0;
	
	for(var col = 1; col <= numCol; col++){
		targetRow = numRow;
		prevValue = 0;
		prevRow = 0;
		
		for(var row = numRow; row >= 1; row--){
			var curID = "#" + row + col;
			if(!($(curID).is(":empty"))){	// If box not empty
				if(prevValue == 0){	// If there is no unused previous value
					prevValue = $(curID).text();	// Flag cur value
					prevRow = targetRow;	// Flag cur row
					if(targetRow > row){
						moveValueTo(curID, "#" + targetRow + col, prevValue);
						change = 1;
					}
					targetRow--;
				}else{	// If there is unused previous value
					if(prevValue == $(curID).text()){	// If prev value == cur value
						var sum = Number(prevValue) + Number($(curID).text());
						moveValueTo(curID, "#" + prevRow + col, sum);
						prevValue = 0;
						prevRow = 0;
						change = 1;
					}else{	// If prev value != cur value
						row++;
						prevValue = 0;
						prevRow = 0;
					}
				}
			}
		}
	}
}

function moveLeft(){
	var targetCol = 1;
	var prevValue = 0;
	var prevCol = 0;
	
	for(var row = 1; row <= numRow; row++){
		targetCol = 1;
		prevValue = 0;
		prevCol = 0;
		
		for(var col = 1; col <= numCol; col++){
			var curID = "#" + row + col;
			if(!($(curID).is(":empty"))){	// If box not empty
				if(prevValue == 0){	// If there is no unused previous value
					prevValue = $(curID).text();	// Flag cur value
					prevCol = targetCol;	// Flag cur row
					if(targetCol < col){
						moveValueTo(curID, "#" + row + targetCol, prevValue);
						change = 1;
					}
					targetCol++;
				}else{	// If there is unused previous value
					if(prevValue == $(curID).text()){	// If prev value == cur value
						var sum = Number(prevValue) + Number($(curID).text());
						moveValueTo(curID, "#" + row + prevCol, sum);
						prevValue = 0;
						prevCol = 0;
						change = 1;
					}else{	// If prev value != cur value
						col--;
						prevValue = 0;
						prevCol = 0;
					}
				}
			}
		}
	}
}

function moveRight(){
	var targetCol = numCol;
	var prevValue = 0;
	var prevCol = 0;
	
	for(var row = 1; row <= numRow; row++){
		targetCol = numCol;
		prevValue = 0;
		prevCol = 0;
		
		for(var col = numCol; col >= 1; col--){
			var curID = "#" + row + col;
			if(!($(curID).is(":empty"))){	// If box not empty
				if(prevValue == 0){	// If there is no unused previous value
					prevValue = $(curID).text();	// Flag cur value
					prevCol = targetCol;	// Flag cur row
					if(targetCol > col){
						moveValueTo(curID, "#" + row + targetCol, prevValue);
						change = 1;
					}
					targetCol--;
				}else{	// If there is unused previous value
					if(prevValue == $(curID).text()){	// If prev value == cur value
						var sum = Number(prevValue) + Number($(curID).text());
						moveValueTo(curID, "#" + row + prevCol, sum);
						prevValue = 0;
						prevCol = 0;
						change = 1;
					}else{	// If prev value != cur value
						col++;
						prevValue = 0;
						prevCol = 0;
					}
				}
			}
		}
	}
}

function init(){
	// whipe the blocks
	for(var i = 1; i <= numRow; i++){
		for(var j = 1; j <= numCol; j++){
			$("#"+i+j).empty();
		}
	}
	
	// reset global
	numRow = 4;
	numCol = 4;
	winner = 0;
	loser = 0;
	alive = 0;
	
	spawn();
	spawn();
}

$(document).ready(function(){
	//init
	spawn();
	spawn();
	
	//testSpawn();
	if(winner == 0 && loser == 0){
		$(document).keydown(function(key) {
	        switch(parseInt(key.which,10)) {
				// Left arrow key pressed
				case 37:
					moveLeft();
					break;
				// Up Arrow Pressed
				case 38:
			        moveUp();
					break;
				// Right Arrow Pressed
				case 39:
					moveRight();
					break;
				// Down Array Pressed
				case 40:
					moveDown();
					break;
			}
			
			checkWinner();

			if(winner == 1){	// if there's a winner
				declareWinner();
			}else if(change == 1){	// if a valid change of position occured
				spawn();
			}else if(alive == 0){	// if game died
				loser = 1;
				declareLoser();
			}
			alive = 0
			change = 0;
		});
	}
	
	$("#restart").click(function(){
		init();
	});
});