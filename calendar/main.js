$(document).ready(function(){
	// defaults
	var defaultDuration = 120; // in minutes

	// calendar setup
	initTimeTable();

	// test controls
	var testLoopCap = 10;

	var editMode = false;

	$(document).on('click', function(event){
		if($('#enterNewItemWrapper').css('display') != "none"){
			if((!$(event.target).is('#enterNewItemWrapper') && !$(event.target).is('#addEvent') && !$(event.target).is('input') && !$(event.target).is('span'))){
				$('#newItemWhatInput').val("");
				$('#newItemWhereInput').val("");
				$('#enterNewItemWrapper').hide();
				if(!editMode || $(event.target).is('#removeEvent')){
					$('.newItemShade').remove();
				}else{
					editMode = false;
					$('.newItemShade')
						.addClass('calendarItem')
						.removeClass('newItemShade');
				}
			}else if(!$(event.target).is('button') && !$(event.target).is('input') && !$(event.target).is('span')){
				$('#enterNewItemWrapper')
					.css('top', $(event.target).offset().top)
					.css('left', $(event.target).offset().left)
					.show();
			}else if($(event.target).is('#addEvent')){ // add event
				editMode = false;
				var $eventContentWhat = $('<p/>');
				var $eventContentWhere = $('<p/>');
				$eventContentWhat.text($('#newItemWhatInput').val());
				$eventContentWhere.text($('#newItemWhereInput').val());
				$('#newItemWhatInput').val("");
				$('#newItemWhereInput').val("");
				$('#enterNewItemWrapper').hide();
				for(var ind = 0; ind < $('.newItemShade').length; ind++){
					var curObj = $('.newItemShade')[ind];
					jQuery.data(curObj, 'objs', $('.newItemShade'));
				}
				var tempTime = $($('.newItemShade').children()[0]);
				var $newEvent = $('.newItemShade')
					.empty()
					.append(tempTime)
					.append($eventContentWhat)
					.append($eventContentWhere)
					.addClass('calendarItem')
					.removeClass('newItemShade');
				collisionCheck($newEvent);
			}
		}else{
			if($(event.target).is('.timeSlots')){
				var $initSlot = $(event.target);
				var $endSlot = getEndSlot($initSlot, defaultDuration);
				var initTime = getSlotTimeInfo($initSlot);
				var finalTime = getSlotTimeInfo($endSlot);
				$('#enterNewItemWrapper')
					.css('top', $initSlot.offset().top - $('#enterNewItemWrapper').height() - 15)
					.css('left', $initSlot.offset().left)
					.show();
				$('#newItemWhenStart').text(getSlotDateInfo($initSlot) + " @ " + initTime);
				$('#newItemWhenEnd').text(getSlotDateInfo($endSlot) + " @ " + finalTime);

				shadeNewEvent($initSlot, $endSlot, "<p>" + initTime + " - " + finalTime + "</p>");
			}else if($(event.target).is('.calendarItem') || $(event.target).is('.calendarItem>p')){
				var $target;
				if($(event.target).is('.calendarItem>p')){
					$target = $(event.target).parent();
				}else{
					$target = $(event.target);
				}
				editMode = true;
				$('#enterNewItemWrapper')
					.css('top', $target.offset().top - $('#enterNewItemWrapper').height() - 15)
					.css('left', $target.offset().left)
					.show();
				$('#newItemWhatInput').val($($target.children()[1]).text());
				$('#newItemWhereInput').val($($target.children()[2]).text());
				// get all related blocks
				var $objs = jQuery.data($target[0], 'objs');
				$objs
					.removeClass('calendarItem')
					.addClass('newItemShade');
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
			if(col < colSlots.length - 1){
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
			if(curBlock.row == -1 && curBlock.col == -1){
				curBlock.row = row;
				curBlock.col = col;
			}
			if(row == rowSlots.length - 1){ // last row, move on to next column
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
		// shade
		for(var i = 0; i < blocks.length; i++){
			curBlock = blocks[i];
			$curSlot = $($(rowSlots[curBlock.row]).children()[curBlock.col]);
			var $block = $('<div/>');
			$block
				.append(contentHTML)
				.css('height', curBlock.blockNum * ($('.timeSlots').height() + 4) - 4 + 'px')
				.addClass('newItemShade');
			$curSlot.append($block);
		}
	}

	function collisionCheck($newItem){
		var $objs = jQuery.data($newItem[0], 'objs');
		console.log($objs);
		for(var i = 0; i < $objs.length; i++){
			var $curObj = $($objs[i]);
			var colSlots = $curObj.parent().parent().children();
			var rowSlots = $curObj.parent().parent().parent().children();
			var col = colSlots.index($curObj.parent());
			var row = rowSlots.index($curObj.parent().parent());
			var r;
			var c = col;
			if(row % 2 != 0){
				c++;
			}
			for(r = 0; r < rowSlots.length; r++){
				if(r != row){
					var $curSlot;
					var $events;
					if(r % 2 == 0){
						$curSlot = $($(rowSlots[r]).children()[c]);
					}else{
						$curSlot = $($(rowSlots[r]).children()[c - 1]);
					}
					$events = $curSlot.find('.calendarItem');
					for(var e = 0; e < $events.length; e++){
						if(collisionCheckHelper($curObj, $($events[e]))){ // collision detected
							console.log("there's collision", $curObj, $($events[e]));
						}
					}
				}
			}
		}
	}

	function collisionCheckHelper($slot1, $slot2){
		var x1 = $slot1.offset().left;
		var y1 = $slot1.offset().top;
		var h1 = $slot1.outerHeight(true);
		var w1 = $slot1.outerWidth(true);
		var b1 = y1 + h1;
		var r1 = x1 + w1;
		var x2 = $slot2.offset().left;
		var y2 = $slot2.offset().top;
		var h2 = $slot2.outerHeight(true);
		var w2 = $slot2.outerWidth(true);
		var b2 = y2 + h2;
		var r2 = x2 + w2;

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		return true;
	}
});
