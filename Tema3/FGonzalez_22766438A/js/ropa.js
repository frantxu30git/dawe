const Producto = require('./producto.js');
class Ropa extends Producto {
    constructor(nombre, precio, talla) {
        super(nombre, precio);
        this.talla = talla;
        this.color = color;
    }

    getTalla() {
        return this.talla;
    }

    setTalla(talla) {
        this.talla = talla;
    }

    static getTipoProducto() {
        return "Ropa";
    }
}

module.exports = Ropa;