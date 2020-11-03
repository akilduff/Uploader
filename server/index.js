const db = require('../database/uploader')
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const mv = require('mv');
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../dist')))
app.use(fileUpload())

app.get('/uploader', function (req, res) {
  var count = {
    jpeg: 0,
    png: 0,
    javascript: 0,
    pdf: 0,
    other: 0
  }
  var queryString = `SELECT dataType FROM samplefiles;`
  db.query(queryString, (err, results, fields) => {
    if (err) {
      console.log('ERR: ', err);
    } else {
      console.log(results)
      results.forEach(result => {
        if (result.dataType.includes('jpeg')) {
          count.jpeg++
        } else if (result.dataType.includes('png')) {
          count.png++
        } else if (result.dataType.includes('javascript')) {
          count.javascript++
        } else if (result.dataType.includes('pdf')) {
          count.pdf++
        } else {
          count.other++
        }
      })
      console.log(count)
      res.send(count);
    }
  })
})

app.post('/uploader', function (req, res) {
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

  res.send();
  res.end();
})

app.listen(port, () => {
  console.log(`now listening at port ${port}`);
})