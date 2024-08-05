const multer = require('multer');
const path = require('path');

// Set storage engine for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let role = req.body.role;
    let uploadPath = role === 'student' ? 'public/images/students' : 'public/images/teachers';
    cb(null, path.join(__dirname, '../../', uploadPath));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Set storage engine for audio
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const role = req.user.role; 
    const uploadPath = role === 'student' ? 'uploads/students' : 'uploads/teachers';
    cb(null, path.join(__dirname, '../../', uploadPath));
  },
  filename: (req, file, cb) => {
    cb(null, `audio-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload for images
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('photo'); 

// Initialize upload for audio
const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    checkAudioFileType(file, cb);
  }
}).single('audio');

// Check image file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Check audio file type
function checkAudioFileType(file, cb) {
  const filetypes = /mp3|m4a|aac|wav/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Audio Files Only!');
  }
}

module.exports = { upload, uploadAudio };