import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import HospitalCard from './HospitalCard';
import FilterControls from './FilterControls';

const HospitalSearch = () => {
  const [hospitals, setHospitals] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [rating, setRating] = useState('');
  const [specialty, setSpecialty] = useState('');
  const issue = 'Kidney Stones'; // Example issue for now

  useEffect(() => {
    const fetchLocationAndHospitals = async () => {
      try {
        // Fetch user location directly from ip-api
        const locationRes = await axios.get('http://ip-api.com/json/');
        const locationData = {
          lat: locationRes.data.lat,
          lon: locationRes.data.lon,
        }

        // Fetch hospitals sorted by distance and rating from the backend
        const hospitalRes = await axios.get(`/api/hospitals`, {
          params: {
            lat: locationData.lat,
            lon: locationData.lon,
            issue,
          },
        });

        setHospitals(hospitalRes.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchLocationAndHospitals();
  }, []);

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Typography variant="h5" sx={{ color: '#3e4b32', fontWeight: 'bold' }} gutterBottom>
        Based on your issue, here are hospitals with expert healthcare professionals:
      </Typography>

      <FilterControls
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        rating={rating}
        setRating={setRating}
        specialty={specialty}
        setSpecialty={setSpecialty}
      />

      <Box sx={{ mt: 4 }}>
        {hospitals.length > 0 ? (
          hospitals.map((hospital, index) => (
            <HospitalCard
              key={index}
              name={hospital.name}
              distance={hospital.distance}
              expertCount={hospital.expertCount}
              rating={hospital.rating}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#D32F2F', fontWeight: 'bold' }}>
            No hospitals match your criteria.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default HospitalSearch;



