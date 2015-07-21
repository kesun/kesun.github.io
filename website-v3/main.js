var timer;
$(document).ready(function(){
	// constants
	// var backgroundColour = "#333333";
	var alphaTrailDrop = 0.025;
	var alphaSimpleHorizontal = 0.05;
	var fillColourTrailDrop = "rgba(0, 0, 0, " + alphaTrailDrop + ")";
	var fillColourSimpleHorizontal = "rgba(0, 0, 0, " + alphaSimpleHorizontal + ")";
	var veloInitCap = 2;
	var veloMaxCap = 8;
	var acc = 0.2;

	// stuff
	var eqMode = 1;
	var oneTimeParticleGenerated = false;
	var audioDOM;

	var frequencyData;
	var particleArr = [];

	window.addEventListener('resize', resizeCanvas, false);

	//printArr();

	function getBackgroundColour(alphaBlack, roundMethod){
		if(roundMethod == "nearest"){
			return "hsla(0, 0%, " + Math.round(1 / (2 * alphaBlack)) + "%, 1)";
		}else{
			return "hsla(0, 0%, " + Math.floor(1 / (2 * alphaBlack)) + "%, 1)";
		}
	}

	function printArr(){
		setTimeout(printArr, 1000);
	}

	function resizeCanvas() {
		var canvas = document.getElementById('backgroundCanvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		initBackgroundAnimation();
	}

	function wipeCanvas(){
		var canvas = document.getElementById('backgroundCanvas');
		var context = canvas.getContext('2d');
		switch(eqMode){
			case 1:
				context.fillStyle = getBackgroundColour(alphaTrailDrop, "nearest");
				break;
			case 2:
				context.fillStyle = getBackgroundColour(alphaSimpleHorizontal, "nearest");;
				break;

		}
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	function initBackgroundAnimation(){
		wipeCanvas();
		particleArr = [];
		clearInterval(timer);
		//generateParticles();
		console.log("eqMode", eqMode);
		generateFrequencyParticles();
		switch(eqMode){
			case 1:
				timer = setInterval(animateTrailDropParticles, 1000/40);
				break;
			case 2:
				timer = setInterval(animateSimpleHorizontalParticles, 1000/40);
				break;
		}
	}
/*
	function generateParticles(){
		setTimeout(generateParticle, 0.00000000000000000001);
	}

	function generateParticle(){
		if(particleArr.length < 1000){
			var pColour = Math.floor(Math.random() * 360);
			var pOpacity = Math.floor(Math.random() + 0.5);
			var pHslaColour = "hsla(" + pColour + ", 60%, 70%, ";
			var canvas = document.getElementById('backgroundCanvas');
			var context = canvas.getContext('2d');
			var yFinal = Math.floor(Math.random() * canvas.height + Math.floor(canvas.height / 3));
			var p = {
				x: Math.floor(Math.random() * canvas.width),
				y: 0,
				xVel: (Math.random() * 0.4 + 0.6) * veloInitCap * Math.cos(Math.random() * 2 * Math.PI),
				yVel: (Math.random() * 0.3) * veloInitCap * Math.sin(Math.random() * 2 * Math.PI),
				r: Math.random() * 5 + 2,
				yFadeInit: Math.floor(Math.random() * yFinal + Math.floor(yFinal / 3)),
				fadeVel: 0,
				fadeAcc: Math.random() * 0.01 + 0.001,
				colourBase: pHslaColour,
				opacity: pOpacity

			}
			particleArr.push(p);
		}
		generateParticles();
	}
*/
	function generateFrequencyParticles(){
		if(frequencyData != undefined){
			var indArr = getValidFrequencyIndArr();
			switch(eqMode){
				case 1:
					oneTimeParticleGenerated = false;
					generateTrailDropParticles(indArr);
					setTimeout(generateFrequencyParticles, 200);
					break;
				case 2:
					if(!oneTimeParticleGenerated){
						generateSimpleHorizontalParticles(indArr);
						oneTimeParticleGenerated = true;
					}
					break;
			}
		}
	}

	function generateTrailDropParticles(indArr){
		for(var i = 0; i < indArr.length; i += Math.floor(Math.random() * (indArr.length / 10) + 5)){
			if(eqMode != 1){
				break;
			}
			var frequencyDataVal = frequencyData[indArr[i]];
			if(frequencyDataVal != 0){
				var pColour = Math.floor(Math.random() * 360);
				var pOpacity = Math.floor(Math.random() + 0.5);
				var pHslaColour = "hsla(" + pColour + ", 60%, 70%, ";
				var canvas = document.getElementById('backgroundCanvas');
				var yFinal = Math.floor(Math.random() * canvas.height + Math.floor(canvas.height / 3));
				var p = {
					x: Math.floor(canvas.width / 255 * frequencyDataVal),
					y: 0,
					xVel: 0,
					yVel: (Math.random() * 0.3) * veloInitCap * Math.sin(Math.random() * 2 * Math.PI),
					r: (Math.random() * 8 + 1) / 255 * frequencyDataVal,
					yFadeInit: Math.floor(Math.random() * yFinal + Math.floor(yFinal / 3)),
					fadeVel: 0,
					fadeAcc: Math.random() * 0.01 + 0.001,
					colourBase: pHslaColour,
					opacity: pOpacity

				}
				particleArr.push(p);
			}
		}
	}

	function generateSimpleHorizontalParticles(indArr){
		var canvas = document.getElementById('backgroundCanvas');
		for(var i = 0; i < frequencyData.length; i++){
			if(eqMode != 2){
				break;
			}
			var frequencyDataVal = frequencyData[i];
			var x = Math.floor(canvas.width / 2 - frequencyData.length / 2) + i;
			var pColour = Math.floor(360 / frequencyData.length * i);
			var pHslaColour = "hsla(" + pColour + ", 60%, 70%, 1)";
			var p = {
				x: x,
				colourBase: pHslaColour
			}
			particleArr.push(p);
		}
	}

	function getValidFrequencyIndArr(){
		var arr = [];
		for(var i = 0; i < frequencyData.length; i++){
			if(frequencyData[i] != 0){
				arr.push(i);
			}
		}
		return arr;
	}


	function animateTrailDropParticles(){
		var canvas = document.getElementById('backgroundCanvas');
		var context = canvas.getContext('2d');
		context.fillStyle = fillColourTrailDrop;
		context.fillRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < particleArr.length; i++){
			var p = particleArr[i];
			var lastX = p.x;
			var lastY = p.y;
			if(p.opacity == 0 || p.y >= canvas.height || p.x <= 0 || p.x >= canvas.width){
				particleArr.splice(i, 1);
				i--;
			}else{
				p.yVel += (1 - 2*Math.random()) * acc + 0.005;

				if(p.yVel > veloMaxCap){
					p.yVel = veloMaxCap;
				}else if(p.yVel < -veloMaxCap){
					p.yVel = -veloMaxCap;
				}
				if(p.yVel < 0){
					p.yVel = -p.yVel;
				}

				p.y += p.yVel;

				if(p.y >= p.yFadeInit){
					p.opacity -= p.fadeAcc;
				}
				if(p.opacity < 0){
					p.opacity = 0;
				}

				context.fillStyle = p.colourBase + p.opacity + ")";
				context.beginPath();
				context.arc(p.x, p.y, p.r, 0, 2*Math.PI, false);
				context.closePath();
				context.fill();
			}
		}
	}

	function animateSimpleHorizontalParticles(){
		var canvas = document.getElementById('backgroundCanvas');
		var context = canvas.getContext('2d');
		var maxHeight = Math.floor(canvas.height / 4);
		context.fillStyle = fillColourSimpleHorizontal;
		context.fillRect(0, 0, canvas.width, canvas.height);
		console.log(frequencyData);
		for(var i = 0; i < frequencyData.length; i++){
			var frequencyDataVal = frequencyData[i];
			var p = frequencyData[i];
			var pY = Math.floor(maxHeight / 255 * frequencyDataVal);
			var pTop = Math.floor(canvas.height / 2) - pY;
			var pBot = Math.floor(canvas.height / 2) + pY;
			context.beginPath();
			context.moveTo(p.x, pTop);
			context.lineTo(p.x, pBot);
			context.strokeStyle = p.colourBase;
			context.stroke();
		}
	}

	function audioSetup(){
		if(audioDOM == undefined){
			var sound, analyser, context;
			audioDOM = new Audio();
			context = new (window.AudioContext || window.webkitAudioContext)();
			audioDOM.src = 'sevenlions.mp3';
			sound = context.createMediaElementSource(audioDOM);
			sound.connect(context.destination);
			analyser = context.createAnalyser();
			sound.connect(analyser);
			sound.connect(context.destination);

			if(frequencyData == undefined){
				frequencyData = new Uint8Array(analyser.frequencyBinCount);
			}

			function getData(){
				setTimeout(function(){
					requestAnimationFrame(getData);
				}, 200);
				analyser.getByteFrequencyData(frequencyData);
			}
		}
		getData();
	}

	function switchSong(songURL){
		audioDOM.pause();
		audioDOM.currentTime = 0;
		audioDOM.src = songURL;
		audioDOM.play();
	}

	// song selection
	$('.song').click(function(){
		var songURL =  $(this).attr('songURL');
		oneTimeParticleGenerated = false;
		resizeCanvas();
		switchSong(songURL);
	});

	$('.eqToggle').click(function(){
		if(eqMode == 2){
			eqMode = 1;
		}else{
			eqMode++;
		}
		resizeCanvas();
	});

	resizeCanvas();
	audioSetup();
});