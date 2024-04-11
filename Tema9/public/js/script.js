document.addEventListener('DOMContentLoaded', function() {
    var dropArea = document.getElementById('drop-area');
    var fileInput = document.getElementById('file-upload'); 
    var submit = document.getElementById('submit');
    const form = document.getElementById('formulario'); // Asegúrate de que tu formulario tenga este ID
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    fileInput.addEventListener('change', function(e) {
        manejarArchivos(this.files);
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, resaltar, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, QuitarResaltado, false);
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío tradicional del formulario

        const formData = new FormData(form);


        fetch('/upload/files', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const statusMessages = document.getElementById('status-messages');
                statusMessages.innerHTML = ''; // Limpiamos los mensajes anteriores
                
                data.files.forEach(file => {
                    const fileElement = document.createElement('p');
                    fileElement.textContent = `Datos del fichero: ${file.originalName} Tipo: ${file.mimeType} Tamaño: ${file.size} bytes`;
                    statusMessages.appendChild(fileElement);
                });
                
                // Añadimos la información del formulario
                const formResultsTitle = document.createElement('h4');
                formResultsTitle.textContent = 'Resultados del formulario:';
                statusMessages.appendChild(formResultsTitle);
                
                const formResultsList = document.createElement('ul');
                i=0;
                for (const key in data.data) {
                    if (i==5){
                        break;
                    }
                    else{
                    const listItem = document.createElement('li');
                    listItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${data.data[key]}`;
                    formResultsList.appendChild(listItem);
                    i++;
                    }
                }
                statusMessages.appendChild(formResultsList);
                
                // Añadimos las imágenes previas si es necesario
                const imagesTitle = document.createElement('h4');
                imagesTitle.textContent = 'Imágenes:';
                statusMessages.appendChild(imagesTitle);

                data.files.forEach(file => {
                    const imgLink = document.createElement('a');
                    imgLink.href = `imgs/${file.originalName}`; 
                    imgLink.target = '_blank'; 
                    const img = new Image();
                    img.src = `imgs/${file.originalName}`; 
                    img.style.width = '100px';
                    imgLink.appendChild(img);
                    statusMessages.appendChild(imgLink);
                });
            } else {
                // Manejo de errores o respuesta fallida
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    
 

    dropArea.addEventListener('drop', drop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function manejarArchivos(files) {
        ([...files]).forEach(SubirArchivo);
    }
    function resaltar() {
        dropArea.classList.add('highlight');
    }

    function QuitarResaltado() {
        dropArea.classList.remove('highlight');
    }

    function drop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        manejarArchivos(files);
    }

    function manejarArchivos(files) {
        ([...files]).forEach(SubirArchivo);
    }

    function SubirArchivo(file) {
        var statusMessages = document.getElementById('status-messages');
        var fileSize = file.size;
        var fileType = file.type || 'no detectado';
        statusMessages.innerHTML += `Nombre: ${file.name} Tipo: ${fileType} Tamaño: ${fileSize} bytes<br>`;
    }
    
});
