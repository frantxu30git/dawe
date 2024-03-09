window.onload = () => {
    
    let x =0;
    let y =0;   
    //Añadir la imagen al canvas
    var canvas = document.getElementById("lienzo");
    var context = canvas.getContext("2d");
    var logo = new Image();
    logo.src = "images/spritesheet.png";
    logo.addEventListener('load', function() {
    context.drawImage(logo, 0, 0);
    context.strokeStyle = "red";
    context.strokeRect(0, 0, 30, 40);
    context.fillText("("+x+","+y+")", 435, 10);
    context.drawImage(canvas, x, y, 30, 40, 480, 0, 60, 80);
    console.log(logo.naturalHeight, logo.naturalWidth);
    });
    
      
    function dibujar() {
        const canvas = document.getElementById("lienzo");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.Width, canvas.height);

        context.drawImage(logo, 0, 0);
        if (canvas.getContext) {
            let Coordenadas = "("+x+","+y+")";
            //Dibuja el rectangulo rojo
            ctx.strokeStyle = "red";
            ctx.strokeRect(x, y, 30, 40);
            //Actualiza las coordenadas
            ctx.fillText(Coordenadas, 430, 10);
            //Actualiza la imagen x2
            ctx.drawImage(canvas, x, y, 30, 40, 480, 0, 60, 80);
        }
    }

       
    function teclado(evento){
        if(evento.keyCode == 37){
            if(x >= 1){
                x = x - 1;
                console.log("izquierda");
                dibujar();
                mostrar();
            }
        }
        if(evento.keyCode == 38){
            if(y >= 1){
                y = y - 1;
                console.log("arriba");
                dibujar();
            }
        }
        if(evento.keyCode == 39){
            if(x <= 444){
                x = x + 1;
                console.log("derecha"); 
                dibujar();
            }
        }
        if(evento.keyCode == 40){
            if(y <= 438){
                y = y + 1;
                console.log("abajo");
                dibujar();
            }
        }
    }  
    document.addEventListener('keydown', teclado); 
}
