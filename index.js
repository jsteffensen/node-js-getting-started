const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('trust proxy', true)
  .set('view engine', 'ejs')
  .get('/*', (req, res) => {
	  res.render('pages/index');
	  console.log('request ip -------------> ' + req.ips);
	  
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
