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
	const connection = mysql.createConnection(config);
	const { lat, lon, issue_id,issue, patient_id } = req.query;
	console.log("Received query params:", req.query);

	if (!lat || !lon || !issue_id || !patient_id) {
	  return res.status(400).json({ error: 'lat, lon, issue_id, and patient_id are required' });
	}
  
	const query = `
	  SELECT 
		h.hosp_id, 
		h.name, 
		h.lat, 
		h.lon, 
		h.rating,
		COUNT(DISTINCT hp.id) AS expertCount
	  FROM issues i
	  JOIN healthcare_professionals hp ON i.specialty = hp.specialty
	  JOIN hospital h ON hp.hospital_id = h.hosp_id
	  WHERE i.issue_id = ? AND i.patient_id = ?
	  GROUP BY h.hosp_id, h.name, h.lat, h.lon, h.rating
	`;
  
	connection.query(query, [issue_id, patient_id], (err, results) => {
	  if (err) {
		console.error('Error fetching hospitals:', err);
		return res.status(500).json({ error: 'Database query error' });
	  }
  
	  const hospitalsWithDistance = results.map(hospital => {
		const distance = getDistance(lat, lon, hospital.lat, hospital.lon);
		return {
		  ...hospital,
		  distance: parseFloat(distance.toFixed(1))
		};
	  });
  
	  hospitalsWithDistance.sort((a, b) => a.distance - b.distance || b.rating - a.rating);
	  res.json(hospitalsWithDistance);
	});
  });
  
  app.get('/api/experts', (req, res) => {
	const connection = mysql.createConnection(config);
	const { hosp_id, issue_id, patient_id } = req.query;
  
	if (!hosp_id || !issue_id || !patient_id) {
	  return res.status(400).json({ error: 'hosp_id, issue_id, and patient_id are required' });
	}
  
	const query = `
	  SELECT hp.first_name, hp.last_name, hp.specialty,hp.id
	  FROM issues i
	  JOIN healthcare_professionals hp ON i.specialty = hp.specialty
	  JOIN hospital h ON hp.hospital_id = h.hosp_id
	  WHERE i.issue_id = ? AND i.patient_id = ? AND h.hosp_id = ?
	`;
  
	connection.query(query, [issue_id, patient_id, hosp_id], (err, results) => {
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
        res.status(200).json({ issue_id: results.insertId });

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

app.get('/api/availability/:hp_id', (req, res) => {
	const connection = mysql.createConnection(config);
	const hp_id = req.params.hp_id;
	if (!hp_id) {
	  return res.status(400).json({ error: 'hp_id is required' });
	}
	const query = `
	  SELECT 
		hp.first_name, 
		hp.last_name,
		a.day_of_week AS day, 
		a.start_time, 
		a.end_time, 
		a.is_available
	  FROM hp_availability a
	  JOIN healthcare_professionals hp ON hp.id = a.hp_id
	  WHERE a.hp_id = ?
	  ORDER BY FIELD(a.day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
	`;
  
	connection.query(query, [hp_id], (err, results) => {
	  if (err) {
		console.error('Error fetching availability with HP details:', err);
		return res.status(500).json({ error: 'Database error' });
	  }
  
	  res.json(results);
	});
  });
  app.post('/api/availability/:hp_id', (req, res) => {
	const connection = mysql.createConnection(config);
	const hp_id = req.params.hp_id;
	const availability = req.body.availability;
  
	if (!Array.isArray(availability)) {
	  return res.status(400).json({ error: 'Availability must be an array' });
	}
  
	const insertQuery = `
	  INSERT INTO hp_availability (hp_id, day_of_week, start_time, end_time, is_available)
	  VALUES ?
	  ON DUPLICATE KEY UPDATE
		start_time = VALUES(start_time),
		end_time = VALUES(end_time),
		is_available = VALUES(is_available)
	`;
  
	const values = availability.map(slot => [
	  hp_id,
	  slot.day,
	  slot.start || null,
	  slot.end || null,
	  slot.is_available
	]);
  
	connection.query(insertQuery, [values], (err) => {
	  if (err) {
		console.error('Error upserting availability:', err);
		return res.status(500).json({ error: 'Database query error' });
	  }
	  res.json({ message: 'Availability updated successfully' });
	});
  });
  
  app.post('/api/bookings', (req, res) => {
	const connection = mysql.createConnection(config);
	const { hp_id, issue_id, patient_id, day, slot, date } = req.body;
  
	if (!hp_id || !issue_id || !patient_id || !day || !slot || !date) {
	  return res.status(400).json({ error: 'All fields are required' });
	}
  
	const query = `
	  INSERT INTO bookings (hp_id, issue_id, patient_id, day, slot, date)
	  SELECT ?, ?, ?, ?, ?, ?
	  FROM dual
	  WHERE NOT EXISTS (
		SELECT 1 FROM bookings 
		WHERE hp_id = ? AND day = ? AND slot = ? AND date = ?
	  )
	`;
  
	const values = [hp_id, issue_id, patient_id, day, slot, date, hp_id, day, slot, date];
  
	connection.query(query, values, (err, results) => {
	  if (err) {
		console.error('Booking error:', err);
		return res.status(500).json({ error: 'Database error' });
	  }
  
	  if (results.affectedRows === 0) {
		return res.status(409).json({ error: 'Slot already booked' });
	  }
  
	  res.status(201).json({ message: 'Booking successful' });
	});
  });


  app.post('/api/check-booked-slots', (req, res) => {
	const connection = mysql.createConnection(config);
	const { hp_id, day, date, slots } = req.body;
  
	if (!hp_id || !day || !date || !Array.isArray(slots)) {
	  return res.status(400).json({ error: 'Invalid request body' });
	}
	
	const query = `
		SELECT slot FROM bookings
		WHERE hp_id = ? AND date = ? AND slot IN (${slots.map(() => '?').join(', ')})
		`;

	connection.query(query, [hp_id, date, ...slots], (err, results) => {
	if (err) {
		console.error('Error checking booked slots:', err);
		return res.status(500).json({ error: 'Database error' });
	}

	const booked = results.map(row => row.slot);
	res.json({ booked });
	});
  });
  
  
app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
