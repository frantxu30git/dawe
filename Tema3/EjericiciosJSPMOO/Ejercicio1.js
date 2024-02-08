class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    suma(punto) {
        const sumaX = this.x + punto.x;
        const sumaY = this.y + punto.y;
        return new Punto(sumaX, sumaY);
    }
}
console.log(new Punto(1, 2).suma(new Punto(2, 1)))