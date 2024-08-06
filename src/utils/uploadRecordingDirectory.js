const fs = require('fs');
const path = require('path');

const uploadRecordingDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  fs.mkdirSync(dirPath, { recursive: true });
};

module.exports = uploadRecordingDirectory;