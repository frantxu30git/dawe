import { listaProductosPorTipo } from './tienda.js';
import { listaNombresProductos } from './tienda.js';
window.onload = () => {
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
            <div class="producto" style="border: 1px solid black; margin-bottom: 10px;">
                <div style="font-weight: bold; color: crimson;">${producto.getNombre()}</div>
                <span style="font-weight: bold;">Precio:</span> ${producto.getPrecio()}€
                <br>
                <span style="font-weight: bold;">${campoEspecifico}:</span> ${valorCampoEspecifico}
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
};
