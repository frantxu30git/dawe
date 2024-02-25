import { listaProductosPorTipo } from './tienda.js';
import { listaNombresProductos } from './tienda.js';

window.onload = () => {
    function annadirProducto(nombreProducto, cantidad, precioTotal) {
        let carrito = document.getElementById('carrito2');

        let productosEnCarrito = carrito.querySelectorAll('.producto');
        let productoExistente = Array.from(productosEnCarrito).find(producto => producto.querySelector('.nombre').textContent === nombreProducto);
    
        if (productoExistente) {
            let cantidadExistente = parseInt(productoExistente.querySelector('.cantidad').textContent);
            let precioTotalExistente = parseFloat(productoExistente.querySelector('.precio').textContent);
            cantidadExistente += cantidad;
            precioTotalExistente += precioTotal;
            productoExistente.querySelector('.cantidad').textContent = cantidadExistente;
            productoExistente.querySelector('.precio').textContent = precioTotalExistente + '€';
        } else {
            let productoHTML = `
                <div class="producto">
                    <div class="nombre">${nombreProducto}</div>
                    <span class="cantidad">${cantidad}</span>
                    <span class="precio">${precioTotal}€</span>
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
            });
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
