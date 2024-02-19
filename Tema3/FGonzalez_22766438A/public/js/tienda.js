import { Ropa } from "./ropa.js";
import { Hogar } from "./hogar.js";
import { Smartphone } from "./smartphone.js";
const productos = [
    new Ropa("Chaqueta", 30, "M"),
    new Ropa("Pantalón", 40, "L"),
    new Hogar("Lámpara", 50, "Habitación"),
    new Hogar("Mesa", 460, "Cocina"),
    new Smartphone("IPhone 15 pro Max", 1499, "Apple"),
    new Smartphone("One Plus Nord 3 CE Lite", 235, "One Plus"),
    new Smartphone("Samsung Galaxy S22 Ultra", 1299, "Samsung"),
    new Smartphone("Google Pixel 7 Pro", 899, "Google"),
    new Smartphone("Xiaomi Mi 12", 799, "Xiaomi"),
    new Smartphone("Huawei P60 Pro", 999, "Huawei"),
    new Smartphone("Sony Xperia 5 Mark III", 999, "Sony"),
    new Smartphone("LG Velvet 3", 699, "LG"),
    new Smartphone("Motorola Edge 30", 499, "Motorola"),
    new Smartphone("Nokia X30 Plus", 599, "Nokia"),
    new Smartphone("ASUS ROG Phone 6", 1299, "ASUS"),
    new Smartphone("BlackBerry Key3", 699, "BlackBerry"),
    new Smartphone("Realme GT 3", 499, "Realme"),
    new Smartphone("Oppo Find X5 Pro", 1099, "Oppo"),
    new Smartphone("Vivo X90 Pro", 899, "Vivo"),
    new Smartphone("Lenovo Legion Duel 4", 799, "Lenovo"),
    new Smartphone("ZTE Axon 40", 599, "ZTE"),
    new Smartphone("Alcatel 5V+", 399, "Alcatel"),
    new Smartphone("TCL 30 Pro", 499, "TCL"),
    new Smartphone("OnePlus 10 Pro", 899, "OnePlus"),
    new Smartphone("Meizu 20 Pro", 799, "Meizu"),
    new Smartphone("Poco X5 Pro", 399, "Poco")
];

const listaNombresProductos = productos.map(producto => producto.constructor.name);
const listaProductosPorTipo = [
    productos.filter(producto => producto instanceof Ropa),
    productos.filter(producto => producto instanceof Hogar),
    productos.filter(producto => producto instanceof Smartphone)
];

export { listaNombresProductos, listaProductosPorTipo };
