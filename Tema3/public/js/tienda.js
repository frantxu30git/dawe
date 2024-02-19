import { Ropa } from "./ropa.js";
import { Hogar } from "./hogar.js";
import { Smartphone } from "./smartphone.js";
const productos = [
    new Ropa("Chaqueta", 30, "M"),
    new Ropa("Pantalón", 40, "L"),
    new Hogar("Lámpara", 50, "Habitación"),
    new Hogar("Mesa", 460, "Cocina"),
    new Smartphone("IPhone 15 pro Max", 1499, "Apple"),
    new Smartphone("One Plus Nord 3 CE Lite", 235, "One Plus")
];

const listaNombresProductos = productos.map(producto => producto.constructor.name);
const listaProductosPorTipo = [
    productos.filter(producto => producto instanceof Ropa),
    productos.filter(producto => producto instanceof Hogar),
    productos.filter(producto => producto instanceof Smartphone)
];

export { listaNombresProductos, listaProductosPorTipo };
