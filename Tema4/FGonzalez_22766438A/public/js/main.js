import { listaProductosPorTipo } from './tienda.js';
import { listaNombresProductos } from './tienda.js';

window.onload = () => {
    function annadirProducto(nombreProducto, cantidad, precioTotal) {
        //si se encuentra el boton <button class="finCompra">Finalizar Compra</button> no se añade el boton. Si no existe se añade
        let botonFinCompra = document.querySelector('.finCompra');
        let carrito = document.getElementById('productosEnCarrito');
        let productosEnCarrito = carrito.querySelectorAll('.producto');
        let productoExistente = Array.from(productosEnCarrito).find(producto => producto.querySelector('.nombre').textContent === nombreProducto);
    
        if (productoExistente) {
            let cantidadExistente = parseInt(productoExistente.querySelector('.cantidad').textContent.split(':')[1].trim());
            let precioTotalExistente = parseFloat(productoExistente.querySelector('.precio').textContent.split(':')[1].replace('€', '').trim());
    
            if (cantidadExistente + cantidad > 9) {
                alert('No se pueden agregar más de 9 copias del producto al carrito.');
            } else {
                cantidadExistente += cantidad;
                precioTotalExistente += precioTotal;
                productoExistente.querySelector('.cantidad').textContent = 'Cantidad: ' + cantidadExistente;
                productoExistente.querySelector('.precio').textContent = 'Precio: ' + precioTotalExistente.toFixed(2) + '€';
            }
        } else {
            console.log('Producto no existente');
            let productoHTML = `
                <div class="producto">
                    <div class="nombre">${nombreProducto}</div>
                    <span class="cantidad">Cantidad: ${cantidad}</span>
                    <br>
                    <span class="precio">Precio: ${precioTotal.toFixed(2)}€</span>
                </div>
            `;
            carrito.innerHTML += productoHTML;

        }
    }
    
    
    function CargarGestoresEventos() {
        // Selecciona todos los spinners
        var spinners = document.querySelectorAll('.quantity-spinner');

        // Agrega un controlador de eventos a cada spinner
        spinners.forEach(function(spinner) {
            spinner.addEventListener('change', function() {
                // Encuentra el botón correspondiente en el mismo contenedor de producto
                var buyButton = this.parentNode.querySelector('.buy-button');

                if (this.value >= 1 && this.value <= 9) {
                    buyButton.disabled = false;
                    buyButton.textContent = 'Comprar ' + this.value;
                } else {
                    buyButton.disabled = true;
                    buyButton.textContent = 'Comprar';
                }
            });
        });

        // Selecciona todos los botones de compra
        let botonesComprar = document.querySelectorAll('.buy-button');
        let carrito = document.querySelector('.carrito');
        let tienda = document.querySelector('.tienda');
        botonesComprar.forEach(function(boton) {
            boton.addEventListener('click', function() {
                carrito.style.visibility = 'visible';
                tienda.style.flex = '0 0 80%';
                let producto = this.parentNode;
                let nombreProducto = producto.querySelector('.nombre').textContent;
                let cantidad = parseInt(producto.querySelector('.quantity-spinner').value);
                let precioUnitario = (producto.querySelector('.precio').textContent);
                precioUnitario = parseFloat(precioUnitario.substring(7, precioUnitario.length ));
                let precioTotal = cantidad * precioUnitario;
                console.log(`Producto: ${nombreProducto}, Cantidad: ${cantidad}, Precio Total: ${precioTotal}€`);
                annadirProducto(nombreProducto, cantidad, precioTotal);
                //poner el spinner a 0 
                producto.querySelector('.quantity-spinner').value = 0;
                //ocultar boton y quitar cantidad
                boton.disabled = true;
                boton.textContent = 'Comprar';
            });
        });
        
       //aumenta el ancho del carrito
       
       carrito.addEventListener('mouseenter',function(){
           //cambia el margin rigt para que se vea el carrito
            tienda.style.width = "80%";
            carrito.style.marginRight = '0%';
            carrito.style.width = "20%";
            console.log('Entra');
            let productosEnCarrito = document.getElementById('productosEnCarrito');
            let productosEnCarrito2 = productosEnCarrito.querySelectorAll('.producto');
            
           // Agrega eventos de mouseover y mouseout a cada producto en el carrito
           productosEnCarrito2.forEach(producto => {
               // Agrega un evento de mouseover para cambiar el estilo cuando el cursor está sobre el producto
               producto.addEventListener('mouseover', function() {
                  
                   this.style.backgroundColor = 'lightgray'; // Cambia el color de fondo del producto
               });
   
               // Agrega un evento de mouseout para restaurar el estilo cuando el cursor sale del producto
               producto.addEventListener('mouseout', function() {
                   this.style.backgroundColor = ''; // Restaura el color de fondo del producto
               });
           });
           
       });

        carrito.addEventListener('mouseleave',function(){
            //cambia el margin rigt para que se oculte el carrito
            carrito.style.marginRight = '2.5%';
            carrito.style.width = "15%";
            
          
        });
        
       
       
    }

    function imprimirProductoHTML(producto) {
        let campoEspecifico = '';
        let valorCampoEspecifico = '';
    
        if (producto.constructor.name === "Ropa") {
            campoEspecifico = 'Talla';
            valorCampoEspecifico = producto.getTalla();
        } else if (producto.constructor.name === "Hogar") {
            campoEspecifico = 'Tipo';
            valorCampoEspecifico = producto.getTipo();
        } else if (producto.constructor.name === "Smartphone") {
            campoEspecifico = 'Marca';
            valorCampoEspecifico = producto.getMarca();
        }
    
        return `
        <div class="producto">
    <div class="nombre">${producto.getNombre()}</div>
    <span class="precio">Precio: ${producto.getPrecio()}€</span>
    <br>
    <span>${campoEspecifico}: ${valorCampoEspecifico}</span> 
    <br>
    <button class="buy-button" disabled>Comprar</button>
    <input type="number" min="0" max="9" value="0" class="quantity-spinner">
</div>
`;
    }

    const columnas = {
        "Smartphone": document.getElementById('Smartphone'),
        "Ropa": document.getElementById('Ropa'),
        "Hogar": document.getElementById('Hogar')
    };
    
    for (let i = 0; i < listaProductosPorTipo.length; i++) {
        for (let j = 0; j < listaProductosPorTipo[i].length; j++) {
            columnas[listaProductosPorTipo[i][j].constructor.name].innerHTML += imprimirProductoHTML(listaProductosPorTipo[i][j]);
        }
    }

    // Llama a la función para evitar la advertencia del linter
    CargarGestoresEventos();
};