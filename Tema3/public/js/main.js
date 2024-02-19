import { listaProductosPorTipo } from './tienda.js';
import { listaNombresProductos } from './tienda.js';
window.onload = () => {
    function imprimirProductoHTML(producto) {
        return `
            <div style="border: 1px solid black; margin-bottom: 10px;">
                <div style="font-weight: bold;">${producto.getNombre()}</div>
                <span style="font-weight: bold;">Precio:</span> ${producto.getPrecio()}€
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
