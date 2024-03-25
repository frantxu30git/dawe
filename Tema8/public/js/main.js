window.onload = () => {

    init();

    function $id(id) {
        return document.getElementById(id);
    }
    // output information
    function output(msg) {
        var m = $id("messages");
        m.innerHTML = msg + m.innerHTML;
    }
    // file drag hover
    function fileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }
    // file selection
    function fileSelectHandler(e) {
    
        // cancel event and hover styling
        fileDragHover(e);
    
        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
        console.log(files.length);
        //if ( e.constructor.name !=  "DragEvent"){
            // process all File objects
            for (var i = 0, f; f = files[i]; i++) {
                console.log(f.name);
                parseFile(f);
            }
        //}
    
        // files can be added by drag&drop or clicking on form's button
        // if the later, append files to form files field 
        var formFiles = $id("upload").fileselect;
        if (formFiles.files.length == 0){
            formFiles.files = files;
        }
    }
    // output file information
    function parseFile(file) {
        console.log(file.name);
        output(
            "<p>Datos del fichero: <strong>" + file.name +
            "</strong> Tipo: <strong>" + file.type +
            "</strong> Tamaño: <strong>" + file.size +
            "</strong> bytes</p>"
        );
    }
    function enviar(submitform){
    
    }
    // initialize
    function init() {
        var fileselect = $id("fileselect"),
            filedrag = $id("filedrag");
        // file select
        fileselect.addEventListener("change", fileSelectHandler, false);
            // file drop
            filedrag.addEventListener("dragover", fileDragHover, false);
            filedrag.addEventListener("dragleave", fileDragHover, false);
            filedrag.addEventListener("drop", fileSelectHandler, false);        
            filedrag.style.display = "block";
    }

    const vacio = () => {
        return document.getElementById("Nombre").value == "" || document.getElementById("numTelefono").value == "" 
        || document.getElementById("email").value == "" || document.getElementById("Libro").value == "" 
        || document.getElementById("fecha").value == "" || document.getElementById("numero").value == "";
    }
    
}
