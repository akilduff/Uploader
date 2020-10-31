const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../dist')))

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.post('/uploader', function (req, res) {
  console.log(req.file)
  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`now listening at port ${port}`);
})