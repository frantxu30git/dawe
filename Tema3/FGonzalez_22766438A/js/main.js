import { listaProductosPorTipo } from './tienda.js';

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
        "Elec": document.getElementById('Elec'),
        "Ropa": document.getElementById('Ropa'),
        "Hogar": document.getElementById('Hogar')
    };

    Object.keys(columnas).forEach(key => {
        const tituloColumna = key;
        const productosColumna = listaProductosPorTipo.find(productos => productos[0].constructor.getTipo() === tituloColumna);

        const columna = columnas[key];
        columna.querySelector('h2').textContent = tituloColumna;

        const listaProductos = columna.querySelector('ul');
        productosColumna.forEach(producto => {
            const productoHTML = imprimirProductoHTML(producto);
            listaProductos.innerHTML += productoHTML;
        });
    });
};
