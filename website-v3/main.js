var timer;
$(document).ready(function(){
	// constants
	var backgroundColour = "#333333";
	var fillColour = "rgba(0, 0, 0, 0.025)";
	var veloInitCap = 1.5;
	var veloMaxCap = 4;
	var acc = 0.2;

	var particleArr = [];

	window.addEventListener('resize', resizeCanvas, false);

	printArr();

	function printArr(){
		setTimeout(printArr, 1000);
	}

	function resizeCanvas() {
		var canvas = document.getElementById('backgroundCanvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		particleArr = [];
		clearInterval(timer);
		initBackgroundAnimation();
	}

	function initBackgroundAnimation(){
		var canvas = document.getElementById('backgroundCanvas');
		var context = canvas.getContext('2d');
		$(canvas).css('background-color', backgroundColour);
		context.fillStyle = backgroundColour;
		context.fillRect(0, 0, canvas.width, canvas.height);
		generateParticles();
		timer = setInterval(animateParticles, 1000/40);
	}

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

	function animateParticles(){
		var canvas = document.getElementById('backgroundCanvas');
		var context = canvas.getContext('2d');
		context.fillStyle = fillColour;
		context.fillRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < particleArr.length; i++){
			var p = particleArr[i];
			var lastX = p.x;
			var lastY = p.y;
			//console.log(i, p.x, p.y);
			if(p.opacity == 0 || p.y >= canvas.height || p.x <= 0 || p.x >= canvas.width){
				particleArr.splice(i, 1);
				i--;
			}else{
				p.xVel += (1 - 2*Math.random()) * acc/10;
				p.yVel += (1 - 2*Math.random()) * acc + 0.005;
				if(p.xVel > veloMaxCap){
					p.xVel = veloMaxCap;
				}else if(p.xVel < -veloMaxCap){
					p.xVel = -veloMaxCap;
				}
				if(p.yVel > veloMaxCap){
					p.yVel = veloMaxCap;
				}else if(p.yVel < -veloMaxCap){
					p.yVel = -veloMaxCap;
				}
				if(p.yVel < 0){
					p.yVel = -p.yVel;
				}

				//p.x += p.xVel;
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

	function audio(){
		var sound;
		var audio = new Audio();
		var context = new AudioContext();
		sound.connect(context.destination);
		audio.src = 'sevenlions.mp3';
		audio.addEventListener('canplay', function() {
			sound = context.createMediaElementSource(audio);
			processor = context.createScriptProcessor(1024),
			analyser = context.createAnalyser();
			processor.connect(context.destination);
			analyser.connect(processor);
			sound.connect(analyser);
			audio.play();
			play();
			function play(){
				var data = new Uint8Array(analyser.fftSize);
				console.log('getByteFrequencyData', analyser.getByteFrequencyData(data));
				setTimeout(play, 2000);
			}
		});
	}

	resizeCanvas();
	audio();
});