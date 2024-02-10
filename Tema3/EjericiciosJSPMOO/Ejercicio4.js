var contador = {
    cont: 0,
    sig: function() {
        return this.cont++;
}
}
console.log(contador.sig()) // → 0
console.log(contador.sig()) // → 1
console.log(contador.sig()) // → 2