import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
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
	  JOIN healthcare_professionals hp ON i.specialty = hp.specialty
	  JOIN hospital h ON hp.hospital = h.name
	  WHERE i.issue = ?
	  GROUP BY h.hosp_id
	`;
  
	connection.query(query, [issue], (err, results) => {
	  if (err) {
		console.error('Error fetching hospitals:', err);
		return res.status(500).json({ error: 'Database query error' });
	  }
  
	  const hospitalsWithDistance = results.map(hospital => {
		const distance = getDistance(lat, lon, hospital.lat, hospital.lon);
		return {
		  ...hospital,
		  distance: parseFloat(distance.toFixed(1)), // Round distance
		};
	  });
  
	  hospitalsWithDistance.sort((a, b) => a.distance - b.distance || b.rating - a.rating);
  
	  res.json(hospitalsWithDistance);
	});
  });
  
  app.get('/api/experts', (req, res) => {
	let connection = mysql.createConnection(config);
	const { hosp_id } = req.query;
  
	if (!hosp_id) {
	  return res.status(400).json({ error: 'Hospital ID is required' });
	}
  
	const query = `
	  SELECT first_name, last_name,specialty 
	  FROM healthcare_professionals
	  WHERE hospital IN (SELECT name FROM hospital WHERE hosp_id = ?)
	`;
  
	connection.query(query, [hosp_id], (err, results) => {
	  if (err) {
		console.error('Error fetching experts:', err);
		return res.status(500).json({ error: 'Database query error' });
	  }
  
	  res.json(results);
	});
  });
  

// Patient Sign Up API
app.post('/api/patientSignup', (req, res) => {
	let connection = mysql.createConnection(config);
	const { healthCard, dob, firstName, lastName, address, password } = req.body;

	let sql = `INSERT INTO patients (health_card, dob, first_name, last_name, address, password_hash) VALUES (?, ?, ?, ?, ?, ?)`;
	let data = [healthCard, dob, firstName, lastName, address, password]; // Store password as plain text

	connection.query(sql, data, (error, results) => {
		if (error) {
			console.error('Error inserting patient:', error);
			res.status(500).send('Error inserting patient data');
			return;
		}

		res.status(200).send('Patient registered successfully');
	});
});

// Healthcare Professional Sign Up API
app.post('/api/healthProfSignup', (req, res) => {
	let connection = mysql.createConnection(config);
	const { firstName, lastName, mincNumber, dob, hospital, specialty, password } = req.body;

	let sql = `INSERT INTO healthcare_professionals (first_name, last_name, minc_number, dob, hospital, specialty, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)`;
	let data = [firstName, lastName, mincNumber, dob, hospital, specialty, password]; // Store password as plain text

	connection.query(sql, data, (error, results) => {
		if (error) {
			console.error('Error inserting healthcare professional:', error);
			res.status(500).send('Error inserting healthcare professional data');
			return;
		}

		res.status(200).send('Healthcare Professional registered successfully');
	});
});

// Create a new issue for a patient
app.post('/api/issues', (req, res) => {
    let connection = mysql.createConnection(config);
    const { patient_id, issue, severity, details, specialty } = req.body;

    let sql = `INSERT INTO issues (patient_id, issue, severity, details, specialty) VALUES (?, ?, ?, ?, ?)`;
    let data = [patient_id, issue, severity, details, specialty];

    connection.query(sql, data, (error, results) => {
        if (error) {
            console.error('Error inserting issue:', error);
            res.status(500).send('Error inserting issue data');
            return;
        }
        res.status(200).send('Issue submitted successfully');
    });

    connection.end();
});

// Retrieve old issues for a patient
app.get('/api/issues/:patient_id', (req, res) => {
    let connection = mysql.createConnection(config);
    let patient_id = req.params.patient_id;

    let sql = `SELECT * FROM issues WHERE patient_id = ? ORDER BY created_at DESC`;
    let data = [patient_id];

    connection.query(sql, data, (error, results) => {
        if (error) {
            console.error('Error fetching issues:', error);
            res.status(500).send('Error retrieving issues');
            return;
        }
        res.status(200).json(results);
    });

    connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
