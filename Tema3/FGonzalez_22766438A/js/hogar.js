// En el archivo hogar.js

const Producto = require('./producto.js');

class Hogar extends Producto {
    constructor(nombre, precio, tipo) {
        super(nombre, precio);
        this.tipo = tipo;
    }

    getTipo() {
        return this.tipo;
    }

    setTipo(tipo) {
        this.tipo = tipo;
    }

    static getTipoProducto() {
        return "Hogar";
    }
}

module.exports = Hogar;