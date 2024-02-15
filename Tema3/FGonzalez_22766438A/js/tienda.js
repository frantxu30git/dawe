import Smartphone from './smartphone.js';
import Hogar from './hogar.js';
import Ropa from './ropa.js';

const productos = [
    new Ropa("Ropa1", 30, "M"),
    new Ropa("Ropa2", 40, "L"),
    new Hogar("Hogar1", 50, "Cocina"),
    new Hogar("Hogar2", 60, "Baño"),
    new Smartphone("Smartphone1", 70, "Samsung"),
    new Smartphone("Smartphone2", 80, "Apple")
];

const listaNombresProductos = productos.map(producto => producto.constructor.name);
const listaProductosPorTipo = [
    productos.filter(producto => producto instanceof Ropa),
    productos.filter(producto => producto instanceof Hogar),
    productos.filter(producto => producto instanceof Smartphone)
];

export { listaNombresProductos, listaProductosPorTipo };
