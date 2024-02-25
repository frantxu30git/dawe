import {Producto}from './producto.js';

export class Smartphone extends Producto {
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
