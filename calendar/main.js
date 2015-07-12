$(document).ready(function(){
	// defaults
	var defaultDuration = 60; // in minutes

	// calendar setup
	initTimeTable();

	// test controls
	var testLoopCap = 10;

	$(document).on('click', function(event){
		if($('#enterNewItemWrapper').css('display') != "none"){
			if(!$(event.target).is('#enterNewItemWrapper') && !$(event.target).is('button') && !$(event.target).is('input') && !$(event.target).is('span')){
				$('#enterNewItemWrapper').hide();
				$('.newItemShade').remove();
			}else if(!$(event.target).is('button') && !$(event.target).is('input') && !$(event.target).is('span')){
				$('#enterNewItemWrapper')
					.css('top', $(event.target).offset().top)
					.css('left', $(event.target).offset().left)
					.show();
			}else if($(event.target).is('#addEvent')){
				$('#enterNewItemWrapper').hide();
				$('.newItemShade')
					.addClass('calendarItem')
					.removeClass('newItemShade');
			}
		}else{
			if($(event.target).is('.timeSlots')){
				var $initSlot = $(event.target);
				var $endSlot = getEndSlot($initSlot, defaultDuration);
				console.log("endSlot", $endSlot[0]);
				var initTime = getSlotTimeInfo($initSlot);
				var finalTime = getSlotTimeInfo($endSlot);
				$('#enterNewItemWrapper')
					.css('top', $initSlot.offset().top - $('#enterNewItemWrapper').height() - 15)
					.css('left', $initSlot.offset().left)
					.show();
				$('#newItemWhenStart').text(getSlotDateInfo($initSlot) + " @ " + initTime);
				$('#newItemWhenEnd').text(getSlotDateInfo($endSlot) + " @ " + finalTime);

				shadeNewEvent($initSlot, $endSlot, "<p>" + initTime + " - " + finalTime + "</p>");
			}
		}
	});

	function initTimeTable(){
		var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var stamps = getDateStamps();

		// make header
		var $headerTable = $('<table/>');
		var $header = $('<tr/>');
		$headerTable.addClass('calendarHeader');
		var emptySlot = $('<td/>');
		emptySlot.addClass('timeStamp');
		$header.append(emptySlot);
		for(var i = 0; i < days.length; i++){
			var $curStamp = $('<td/>');
			var $stampDiv = $('<div/>');
			$stampDiv
				.addClass('stampContent')
				.text(stamps[i]);
			$curStamp.append($stampDiv);
			$header.append($curStamp);
		}
		$headerTable.append($header);

		// make calendar time slots
		var $table = $('<table/>');
		$table.addClass('calendarBody');
		for(var i = 0; i < 24; i++){
			for(var j = 0; j < 2; j++){
				var $curRow = $('<tr/>');
				if(j == 0){
					var $timeStamp = $('<td/>');
					var curTime = i + ":00";
					$timeStamp
						.prop('rowspan', 2)
						.addClass('timeStamp')
						.append(curTime);
					$curRow.append($timeStamp);
				}
				for(var day = 0; day < days.length; day++){
					var $curDay = $('<td/>');
					$curDay.addClass('timeSlots');
					$curRow.append($curDay);
				}
				$table.append($curRow);
			}

		}
		$('#baseTimeTable')
			.append($headerTable)
			.append($table);

		function getDateStamps(){
			var today = new Date();
			var dayOfWeek = new Date();
			var dateArr = [];
			dayOfWeek.setDate(today.getDate() - today.getDay());
			for(var day = 0; day < days.length; day++){
				dateArr.push(days[day] + " " + (dayOfWeek.getMonth() + 1) + "/" + dayOfWeek.getDate());
				dayOfWeek.setDate(dayOfWeek.getDate() + 1);
			}
			return dateArr;
		}
	}

	function getSlotDateInfo($slot){
		var col = $slot.parent().children().index($slot);
		var row = $slot.parent().parent().children().index($slot.parent());
		if(row % 2 != 0){
			col++;
		}
		return $($('.calendarHeader').find('td')[col]).text();
	}

	function getSlotTimeInfo($slot){
		var col = $slot.parent().children().index($slot);
		var row = $slot.parent().parent().children().index($slot.parent());
		var time = row;
		var tempTime;
		if(row % 2 != 0){
			col++;
			row--;
		}
		tempTime = $($('.timeStamp')[row / 2 + 1]).text();
		if(time != row){
			time = tempTime.split(":")[0] + ":" + 30;
		}else{
			time = tempTime;
		}
		return time;
	}

	function getEndSlot($initSlot, durationInMin){
		var slotNum = Math.floor(durationInMin / 30);
		var colSlots = $initSlot.parent().children();
		var rowSlots = $initSlot.parent().parent().children();
		var col = colSlots.index($initSlot);
		var row = rowSlots.index($initSlot.parent());
		if(row < rowSlots.length - slotNum){
			row += slotNum;
		}else if(row >= rowSlots.length - slotNum && row <= rowSlots.length - 1){
			console.log('asdasd');
			if(col < colSlots.length - 1){
				console.log('asdsadasdsdas');
				row -= rowSlots.length - slotNum;
				if(slotNum % 2 == 0){
					col++;
				}
			}else{ // hard-stopping duration from exceeding the allowance of the current calendar
				row = rowSlots.length - 1;
				col = $(rowSlots[row]).children().length - 1;
			}
		}
		return $($(rowSlots[row]).children()[col]);
	}

	function shadeNewEvent($initSlot, $endSlot, contentHTML){
		var colSlots = $initSlot.parent().children();
		var rowSlots = $initSlot.parent().parent().children();
		var col = colSlots.index($initSlot);
		var row = rowSlots.index($initSlot.parent());
		var $curSlot;
		var blocks = [];
		var curBlock = {
			row: -1,
			col: -1,
			blockNum: 0
		}

		// get the regions that are to be shaded
		var looper = 0;
		while(!($curSlot = $($(rowSlots[row]).children()[col])).is($endSlot) && looper < testLoopCap){
			console.log("row", row, "col", col, 'curBlock', curBlock);
			if(curBlock.row == -1 && curBlock.col == -1){
				console.log('update shading info', row, col);
				curBlock.row = row;
				curBlock.col = col;
			}
			if(row == rowSlots.length - 1){ // last row, move on to next column
				console.log('hit last row', row, col);
				blocks.push({
					row: curBlock.row,
					col: curBlock.col,
					blockNum: curBlock.blockNum + 1
				});
				curBlock.blockNum = 0;
				curBlock.row = -1;
				curBlock.col = -1;
				col += 2;
				row = 0;
			}else{
				console.log('increment row normally', row, col);
				curBlock.blockNum++;
				row++;
				if(row % 2 != 0){
					col--;
				}else{
					col++;
				}
			}
			looper++;
		}
		if(curBlock.blockNum > 0){
			blocks.push(curBlock);
		}
		console.log('blocks', blocks);
		// shade
		for(var i = 0; i < blocks.length; i++){
			curBlock = blocks[i];
			$curSlot = $($(rowSlots[curBlock.row]).children()[curBlock.col]);
			var $block = $('<div/>');
			$block
				.append(contentHTML)
				.css('height', curBlock.blockNum * ($('.timeSlots').height() + 4) - 2 + 'px')
				.addClass('newItemShade');
			$curSlot.append($block);
		}
		
	}
});
