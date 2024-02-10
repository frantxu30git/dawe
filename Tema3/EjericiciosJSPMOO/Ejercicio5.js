const almacen = [
    {tipo: "lavadora", valor: 5000},
    {tipo: "lavadora", valor: 650},
    {tipo: "vaso", valor: 10},
    {tipo: "armario", valor: 1200},
    {tipo: "lavadora", valor: 77}
]
// Filtrar los productos que sean lavadoras
// Sumar los valores de las lavadoras. Al acumulador se le suma el valor del producto. Empieza en 0.
let totalValorLavadoras = almacen.filter(producto => producto.tipo === "lavadora").reduce((acumulador, producto) => acumulador + producto.valor, 0);
console.log (totalValorLavadoras); 