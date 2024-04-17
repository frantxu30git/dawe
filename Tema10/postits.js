/* postits.js
 *
 */

window.onload = init;

let nextIndex = 0;
let focus = null;
function init() {
	
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	loadStickies();
	
	var clearButton = document.getElementById("clear_button");
	clearButton.onclick = clearStickyNotes;
	updateStorageUsed();
	document.addEventListener('keydown', deleteKey); 

}
//crea el sticker, comprueba si hay alguno con esa key y si no la hay lo crea y añade al DOM
function createSticky() {
	var value = document.getElementById("note_text").value;
	
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
	
	span.tabIndex = 0; 
	span.onmouseover = function() { this.focus(); };
    span.onmouseout = function() { this.blur(); };
	span.onfocus = function() { 
		focus = stickies; 
		console.log(focus);
	}; 
    span.onblur = function() { 
		if(focus == stickies){
			focus = null;
		} 
	} 
	postit.appendChild(span);
	stickies.appendChild(postit);	
}



function clearStickyNotes() {	
	localStorage.clear();
    var stickies = document.getElementById("stickies");
    while (stickies.firstChild) {
        stickies.removeChild(stickies.firstChild);
    }
	updateStorageUsed();
}

//funcion que se encarga de cargar los stickers de la localstorage
function loadStickies() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("postit_")) {
            addStickyToDOM(localStorage.getItem(key));
        }
    }
	updateStorageUsed();

}

//funcion que se encarga de actualizar el espacio utilizado
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

function deleteKey(event) {
    if (event.keyCode == 8 && focus !=null) {
		console.log("entra");
        removeFromLocalStorage(focus.innerText); 
        updateStorageUsed();
    }
}

///AQUI ME PETA EL PROGRAMA, SUPUESTAMENTE EL ERROR ESTA EN LA LINEA 97 
//postits.js:97 Uncaught TypeError: Cannot set properties of null (setting 'innerText')
//at updateStorageUsed (postits.js:97:60)
//at HTMLDocument.deleteKey (postits.js:105:9)

/*function removeFromLocalStorage(postitText) {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith("postit_")) {
            let value = localStorage.getItem(key);
            if (value === postitText) {
                localStorage.removeItem(key);
                return;
            }
        }
    });
}*/