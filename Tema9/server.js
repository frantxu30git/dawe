const express = require('express');
const multer = require('multer');
const mongojs = require('mongojs');
const app = express();

const db = mongojs('mongodb://localhost:27017/laboratorio', ['subidas']);



app.use(express.static('public'));

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPG and PNG are allowed!'), false);
  }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/imgs/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 2000000 } });
  

app.post('/upload/files', upload.array('files'), (req, res) => {
  const filesData = req.files.map(file => ({
    originalName: file.originalname,
    mimeType: file.mimetype,
    path: file.path,
    size: file.size
  }));

  const formData = {
    nombre: req.body.Nombre, 
    telefono: req.body.Telefono,
    email: req.body.Email,
    libros: req.body.Libros,
    cantidad: req.body.Cantidad,
    files: filesData
  };
  
  console.log(req.body);
  db.subidas.insert(formData, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error al guardar en MongoDB" });
    } else {
      res.json({
        success: true,
        message: "Files uploaded and data saved to MongoDB successfully!",
        data: formData,
        files: filesData
      });
    }
  });
}
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
