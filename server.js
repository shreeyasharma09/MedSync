import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import axios from 'axios';
import response from 'express';
import { time } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});
  
  // Haversine formula for distance calculation
  const getDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // Radius of Earth in km
	const toRad = (deg) => (deg * Math.PI) / 180;
  
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
  
	const a =
	  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
	  Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
  };
  
  // API to get hospitals sorted by distance and rating
  app.get('/api/hospitals', (req, res) => {
	let connection = mysql.createConnection(config);
	const { lat, lon, issue } = req.query;
  
	if (!lat || !lon || !issue) {
	  return res.status(400).json({ error: 'Latitude, longitude, and issue are required' });
	}
  
	const query = `
	  SELECT h.hosp_id, h.name, h.lat, h.lon, h.rating, 
			 COUNT(hp.id) AS expertCount
	  FROM issues i
	  JOIN healthcare_professional hp ON i.specialty = hp.specialty
	  JOIN hospital h ON hp.hospital = h.name
	  WHERE i.issue = ?
	  GROUP BY h.hosp_id
	`;
  
	connection.query(query, [issue], (err, results) => {
	  if (err) {
		console.error('Error fetching hospitals:', err);
		return res.status(500).json({ error: 'Database query error' });
	  }
  
	  // Compute distances and sort hospitals
	  const hospitalsWithDistance = results.map(hospital => {
		const distance = getDistance(lat, lon, hospital.lat, hospital.lon);
		return { ...hospital, distance };
	  });
  
	  // Sort by distance first, then rating
	  hospitalsWithDistance.sort((a, b) => a.distance - b.distance || b.rating - a.rating);
  
	  res.json(hospitalsWithDistance);
	});
  });




app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
