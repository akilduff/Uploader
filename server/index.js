const db = require('../database/uploader')
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const mv = require('mv');
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../dist')))
app.use(fileUpload())

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.post('/', function (req, res) {
  console.log('SAMPLE FILE: ', req.files.sampleFile)
  var dataType = req.files.sampleFile.mimetype;
  var fileNameSpace = req.files.sampleFile.name;
  var fileName = fileNameSpace.split(' ').join('');

  let sampleFile = req.files.sampleFile;
  var fileLocation = path.join(__dirname, `../database/archives/${fileName}`);
  sampleFile.mv(fileLocation, (err) => {
    if (err) {
      console.log('ERR: ', err)
    }
  });

  var queryString = `INSERT INTO samplefiles (fileName, fileLocation, dataType) VALUES ('${fileName}', '${fileLocation}', '${dataType}');`
  db.query(queryString, (err, results) => {
    if (err) {
      console.log('ERR: ', err);
    }
  })

  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`now listening at port ${port}`);
})