const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dataFilePath = 'data-container.json';

const app = express();
const port = 3010;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });


let uploadedFiles = [];

app.use(cors());

if (fs.existsSync(dataFilePath)) {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  uploadedFiles = JSON.parse(data);
}

app.post('/upload', upload.array('files', 5), (req, res) => {
  const files = req.files;
  const { elementName, user, date, workArea, description } = req.body;

  const container = {
    elementName,
    user,
    date,
    workArea,
    description,
    files: [],
  };

  files.forEach(file => {
    container.files.push({ fileName: file.filename });
  });

  uploadedFiles.push(container);

  res.json({ message: 'Files uploaded successfully' });
});

app.get('/api/data', (req, res) => {
  res.json(uploadedFiles);
});

// New route for file download
app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set the appropriate headers for file download
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-type', 'application/octet-stream');

    // Create a read stream from the file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    // If the file doesn't exist, send a 404 response
    res.status(404).json({ message: 'File not found' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running.');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  fs.writeFileSync(dataFilePath, JSON.stringify(uploadedFiles, null, 2), 'utf-8');
  process.exit();
});
