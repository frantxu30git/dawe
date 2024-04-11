const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Serve static files from 'public' folder
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
      // Conserva el nombre original del archivo y la extensión
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 2000000 } });
  

app.post('/upload/files', upload.array('files'), (req, res) => {
  try {
    const filesInfo = req.files.map(file => file.path);
    res.json({
      success: true,
      message: "Files uploaded successfully!",
      data: req.body,
      files: filesInfo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error uploading files" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
