require('dotenv').config();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.mysqlUser,
  password: process.env.mysqlPasswordnode
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});