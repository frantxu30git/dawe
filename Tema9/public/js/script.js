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
    //añade un evento al boton submit que al hacer click se envie el formulario y muestre por consola si se ha enviado
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío tradicional del formulario

        const formData = new FormData(form);
        // Aquí podrías añadir más datos al formData si es necesario, por ejemplo:
        // formData.append('key', 'value');

        fetch('/upload/files', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Aquí puedes implementar cómo deseas mostrar los mensajes de estado
            // Por ejemplo, si quieres mostrar el mensaje en un div con ID 'message'
            const messageElement = document.getElementById('message');
            if(data.success) {
                messageElement.textContent = "¡Archivos subidos correctamente!";
                // Si deseas mostrar también los datos del formulario y los archivos subidos:
                // messageElement.textContent += ` Datos: ${JSON.stringify(data.data)} - Archivos: ${data.files.join(', ')}`;
            } else {
                messageElement.textContent = "Error al subir archivos";
            }
        })
        .catch((error) => {
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
