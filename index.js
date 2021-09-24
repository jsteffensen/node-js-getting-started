const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('trust proxy', true)
  .set('view engine', 'ejs')
  .get('/*', (req, res) => {
	  res.render('pages/index');
	  console.log('request ip -------------> ' + req.ips);
	  
		client.query('INSERT INTO Ips (IpAddress) VALUES (' + req.ips + ');', (err, res) => {
		  if (err) throw err;
		  console.log('saved: ' + req.ips);
		  client.end();
		});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
