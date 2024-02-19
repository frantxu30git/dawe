import {Producto} from './producto.js';
export class Ropa extends Producto {
    constructor(nombre, precio, talla) {
        super(nombre, precio);
        this.talla = talla;
        this.talla = talla;
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
