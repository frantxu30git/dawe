window.onload = () => {
    let boton = document.getElementById("boton");
    console.log(boton.textContent);
    boton.addEventListener("click", function(){
    let isbn = document.getElementById("combobox").value;
    console.log(isbn);
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        let h1s = document.querySelector("h1");
        let h2s = document.querySelector("h2");
        let imgs = document.querySelector("img");
        // Verificar si el h1 existe antes de intentar eliminarlo
        if (h1s) {
            // Eliminar el h1
            h1s.remove();
            console.log("h1 eliminado");
            while(h2s){
                //Eliminar el h2 o h2s
                h2s.remove();
                h2s = document.querySelector("h2");
                console.log("h2 eliminado");
            }             
            imgs.remove();
            console.log("imagen eliminada");
        } else {
            console.log("No hay h1 para eliminar");
        }
        let name = response[`ISBN:${isbn}`];
        console.log(name);
        let detalles = name[`details`];
        console.log(detalles);
        let autores = detalles["authors"];
        console.log(autores);

        /*Hay cosas que se podiran quitar de aqui
        let bib =name["bib_key"];
        console.log(bib);
        let info_url =name["info_url"];
        console.log(info_url);
        let preview =name["preview"];
        console.log(preview);
        let preview_url =name["preview_url"];
        console.log(preview_url);*/
        let thumbnail_url =name["thumbnail_url"];
        //console.log(thumbnail_url);
        //let thumbnail_M = thumbnail_url.replace("-S.jpg", "-M.jpg");
        //console.log(thumbnail_M);
        let thumbnail_L = thumbnail_url.replace("-S.jpg", "-L.jpg");
        console.log(thumbnail_L);

        // titulo
        let titulo = document.createElement("h1");
        titulo.innerText = detalles["title"];
        document.body.appendChild(titulo);
        console.log("Titulo añadido : " + titulo.textContent);
                
        //Autor o autores 
        for(let i = autores.length - 1; i >= 0; i--){
            let autor = document.createElement("h2");
            autor.innerText = autores[i].name;
            document.body.appendChild(autor);
            console.log("Autor añadido : " + autor.textContent);
        }

        // Incluimos la portada falta cambiar el tamaño
        // TAMAÑO L
        let img = document.createElement("img");
        img.src = thumbnail_L;
        img.width = 200;
        img.height = 200;
        document.body.appendChild(img);
        console.log("Imagen añadida");

        /* TAMAÑO M
        let img1 = document.createElement("img");
        img1.src = thumbnail_M;
        img1.width = 200;
        img1.height = 200;
        document.body.appendChild(img1);
        console.log("Imagen añadida");*/

        /* TAMAÑO S
        let img3 = document.createElement("img");
        img3.src = thumbnail_url;
        img3.width = 200;
        img3.height = 200;
        document.body.appendChild(img3);
        console.log("Imagen añadida");*/
    })
    });
   
}
