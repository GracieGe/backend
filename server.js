const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');
const uploadRecordingDirectory = require('./src/utils/uploadRecordingDirectory');

const app = express();
const PORT = process.env.PORT || 5001;

const directories = [
  path.join(__dirname, 'public/images/students'),
  path.join(__dirname, 'public/images/teachers'),
  path.join(__dirname, 'uploads/students'),
  path.join(__dirname, 'uploads/teachers')
];

directories.forEach(dir => uploadRecordingDirectory(dir));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(5001, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});