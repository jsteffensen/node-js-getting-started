const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

connection.connect();

connection.query('SELECT * from Ips', function(err, rows, fields) {
  if (err) throw err;
    rows.forEach(element => {
	  console.log(element);
	});
});





express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('trust proxy', true)
  .set('view engine', 'ejs')
  .get('/*', (req, res) => {
	  res.render('pages/index');
	  console.log('request ip -------------> ' + req.ips);
	  
	  connection.connect();
	  connection.query('INSERT INTO Ips (`IpAddress`) VALUES (`' + req.ips + '`)', function(err, rows, fields) {
	  if (err) throw err;
      console.log('saved');
	});


	  
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
