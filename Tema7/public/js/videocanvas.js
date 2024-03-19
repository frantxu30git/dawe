var efecto = null;
var clip = "videos/demovideo1"; // nombre del vídeo, sin extensión

window.onload = function() {

	var video = document.getElementById("video");
	var botonByN = document.getElementById("byn");
	botonByN.onclick = cambiarEfecto;
	var botonNormal = document.getElementById("normal");
	botonNormal.onclick = cambiarEfecto;
				
	video.addEventListener("play", procesarFrame, false);
	
	video.src = clip + getFormatExtension();
	video.load();
	video.play();

	//Ejercicio a) pausar y reanudar el video
	var pausar = document.getElementById("pausar");
	pausar.onclick = function() {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	};

	//Ejercicio b) cambiar efecto del video
	// Creo que esta hecho pero no se cambia el efecto
	var ciencia = document.getElementById("cienciaFiccion");
	ciencia.onclick = cambiarEfecto;

	//Ejercicio c) Rotar el video	
	var rotar = document.getElementById("rotar");
	var display = document.getElementById("display");
	rotar.addEventListener("click", function() {
			girar(display);			
		});
	
	
	//Ejercicio d) Añadir sonido
	document.getElementById('loadAudio').addEventListener('click', function() {
		loadAudio("../audio/soundtrack.mp3").then(audio => audio.play());
	});

	//Ejercicio e) Mostrar el video en formato Pip
	//no se aplican los efectos en el modo pip
	var pip = document.getElementById("pip");
	pip.addEventListener("click", async function() {
		try {
			await video.requestPictureInPicture();
		  } catch (error) {
			console.error("Error en el modo pip", error);
		  }
	});
}

function girar(display) {
	var x      = (display.width - video.width);
	var y      = (display.height - video.height) ;	
	var cx     = x + 0.5 * display.width;   
	var cy     = y + 0.5 * display.height;  	
	display.getContext("2d").clearRect(0, 0, display.width, display.height);
	
	drawVideo(display.getContext("2d"), x, y, cx, cy, display.width, display.height);
	
	requestAnimationFrame(function(){
		girar(display);
	});
}

function drawVideo(context, x, y, cx, cy, width, height) {
	context.translate(cx, cy);              
	context.rotate( (Math.PI / 180) * 0.5);  
	context.translate(-cx, -cy);             

	context.drawImage(video, x, y, width, height);	
}

	

function cambiarEfecto(e){
	var id = e.target.getAttribute("id");
	if ( id == "byn" ){
		efecto = byn;
		console.log("byn");
	} 
	else if ( id == "cienciaFiccion" ){
		efecto = scifi;
		console.log("scifi");
	}
	else {
		efecto = null;
		console.log("normal");
	}
}

function getFormatExtension() {
	var video = document.getElementById("video");
	if (video.canPlayType("video/mp4") != "") {
		return ".mp4";
	} 
	else if (video.canPlayType("video/ogg") != "") {
		return ".ogv";
	}
	else if (video.canPlayType("video/webm") != "") {
		return ".webm";
	} 
}


function procesarFrame(e) {
	var video = document.getElementById("video");

	if (video.paused || video.ended) {
		return;
	}

	var bufferCanvas = document.getElementById("buffer");
	var displayCanvas = document.getElementById("display");
	var buffer = bufferCanvas.getContext("2d");
	var display = displayCanvas.getContext("2d");

	buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
	var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
	var length = frame.data.length / 4;

	for (var i = 0; i < length; i++) {
		var r = frame.data[i * 4 + 0];
		var g = frame.data[i * 4 + 1];
		var b = frame.data[i * 4 + 2];
		if (efecto){		
			efecto(i, r, g, b, frame.data);
		}
	}
	display.putImageData(frame, 0, 0);

	setTimeout(procesarFrame, 0);
	// en los navegadores modernos, es mejor usar :
	// requestAnimationFrame(procesarFrame);

}
function loadAudio(src) {
	return new Promise((resolve, reject) => {
		const audio = new Audio();
		audio.src = src;
		audio.onloadeddata = () => resolve(audio);
		audio.onerror = (e) => reject(e);
	});
}	
function byn(pos, r, g, b, data) {
	var gris = (r+g+b)/3;

	data[pos * 4 + 0] = gris;
	data[pos * 4 + 1] = gris;
	data[pos * 4 + 2] = gris;
}

function scifi(pos, r, g, b, data) {
	var offset = pos * 4;
	data[offset] = Math.round(255 - r);
	data[offset+1] = Math.round(255 - g) ;
	data[offset+2] = Math.round(255 - b) ;
}
