const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var mysql = require('mysql');

var connection = mysql.createConnection(process.env.JAWSDB_URL);



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('trust proxy', true)
  .set('view engine', 'ejs')
  .get('/*', (req, res) => {
	  res.render('pages/index');
	  console.log('request ip -------------> ' + req.ips);
	  
		connection.connect();

		connection.query('CREATE TABLE Ips ()', function(err, rows, fields) {
		  if (err) throw err;

		  console.log('The solution is: ', rows[0].solution);
		});

		connection.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
