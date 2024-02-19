// En el archivo hogar.js
import {Producto} from './producto.js';
export class Hogar extends Producto {
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

