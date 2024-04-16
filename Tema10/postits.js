/* postits.js
 *
 */

window.onload = init;

let nextIndex = 0;

function init() {
	
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	loadStickies();
	
	var clearButton = document.getElementById("clear_button");
	clearButton.onclick = clearStickyNotes;
	updateStorageUsed();

	//var tamaño = document.getElementById("tamaño");
	

	// cargar las notas postit de localStorage  
	// cada nota se guarda como un par así: postit_X = texto_de_la_nota
	// donde X es el número de la nota
	// por cada una de ellas, llamar al método
	// addStickyToDOM(texto_de_la_nota);
}

function createSticky() {
	var value = document.getElementById("note_text").value;
	
        // crear la nota con nombre postit_X, donde X es un número entero
		// (postit_1, postit_2, ...)  y guardarla en el localStorage
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key.startsWith("postit_")) {
			nextIndex++;
		}
	}
	var key = "postit_" + nextIndex;
	localStorage.setItem(key, value);
	nextIndex++;
	addStickyToDOM(value);
	updateStorageUsed();

}


function addStickyToDOM(value) {
	var stickies = document.getElementById("stickies");
	var postit = document.createElement("li");
	var span = document.createElement("span");
	span.setAttribute("class", "postit");
	span.innerHTML = value;
	postit.appendChild(span);
	stickies.appendChild(postit);	
}



function clearStickyNotes() {	
	// Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
	// elimine las notas de pantalla y de localStorage
	// Algoritmo:	
	// obtener una referencia a la capa "stickies"
	// recorrer los hijos (childNodes) de esa referencia,
	// eliminándolos uno a uno (removeChild)var stickies = document.getElementById("stickies");
	localStorage.clear();
    var stickies = document.getElementById("stickies");
    while (stickies.firstChild) {
        stickies.removeChild(stickies.firstChild);
    }
	updateStorageUsed();

}

function loadStickies() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("postit_")) {
            addStickyToDOM(localStorage.getItem(key));
        }
    }
	updateStorageUsed();

}

function updateStorageUsed() {
    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("postit_")) {
            let value = localStorage.getItem(key);
            totalBytes += (value.length * 16) / 8; 
        }
    }
    let totalKB = totalBytes / 1024; 
    document.getElementById('espacio_utilizado').innerText = `Espacio utilizado: ${totalKB.toFixed(2)} KB`;
}