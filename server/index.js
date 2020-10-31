const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../dist')))
app.use(fileUpload())

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.post('/', function (req, res) {
  console.log('Request Files: ', req.files)
  const dataType = req.files.sampleFile.mimetype;
  const fileName = req.files.sampleFile.name;

  res.send('Hello World');
  res.end();
})

app.listen(port, () => {
  console.log(`now listening at port ${port}`);
})