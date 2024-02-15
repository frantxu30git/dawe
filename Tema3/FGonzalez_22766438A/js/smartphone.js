const Producto = require('./producto.js');

class Smartphone extends Producto {
    constructor(nombre, precio, marca) {
        super(nombre, precio);
        this.marca = marca;
    }

    getMarca() {
        return this.marca;
    }

    setMarca(marca) {
        this.marca = marca;
    }

    static getTipoProducto() {
        return "Smartphone";
    }
}

module.exports = Smartphone;