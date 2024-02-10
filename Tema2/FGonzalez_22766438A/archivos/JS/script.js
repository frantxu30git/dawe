//Funcion del ejercicio 2
function addLink(ul, text) {
    let newLink = text;
    ul.insertAdjacentHTML('beforeend', newLink);
}
window.onload = () => {
    //Ejercicio 1
    // Selecciona el elemento <main>
    let mainElement = document.querySelector('main');

    // Define el nuevo HTML
    let newHTML = `
      <section>
        <h1>Ejercicio 1</h1>
        <article>Texto del Ejercicio 1</article>
        <article>Texto del Ejercicio 1</article>
        <article>Texto del Ejercicio 1</article>
      </section>
    `;

    // Inserta el nuevo HTML después del contenido actual de <main>
    mainElement.insertAdjacentHTML('beforeend', newHTML);

    //Ejercicio 2
    let asideElement = document.querySelector('aside ul');
    addLink(asideElement,  `<li><a href="#">Enlace 1 Ejercicio 2</a></li>
    <li><a href="#">Enlace 2 Ejercicio 2</a></li>
    <li><a href="#">Enlace 3 Ejercicio 2</a></li>`);
    let footerUl = document.querySelector('footer ul');
    addLink(footerUl, `<li><a href="#">Enlace Footer Ejercicio 2</a></li>`);
    let headerUl = document.querySelector('header ul');
    addLink(headerUl, `<li><a href="#">Enlace Header Ejercicio 2</a></li>`);
    //Ejercicio 3
    //Reduciremos el tamaño por defecto de la fuente del texto de todos los <article>. Con la propiedad font-size existe la opción “smaller”
    let articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.style.fontSize = 'smaller';
    });
    //Cambia el estilo de texto de los enlaces del aside para que no tengan subrayado y estén en cursiva (italic).
    let links = document.querySelectorAll('aside a');
    links.forEach(link => {
        link.style.textDecoration = 'none';
        link.style.fontStyle = 'italic';
    });
    //Cambia el estilo de los enlaces del <nav> para que tengan un tamaño menor que el por defecto y además estén en negrita (bold).
    let navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.style.fontSize = 'smaller';
        link.style.fontWeight = 'bold';
    });
    //Imprime por consola el número de elementos <li> que hay tras realizar todas las tareas anteriores.
    console.log(document.querySelectorAll('li').length);

}