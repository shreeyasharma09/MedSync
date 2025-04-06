import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import HospitalCard from './HospitalCard';
import ExpertCard from './ExpertCard';
import FilterControls from './FilterControls';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HospitalSearch = () => {
  const query = useQuery();
  const specialty = query.get('specialty');
  const issue_id = query.get('issue_id');
  const patient_id = query.get('patient_id')
  const issue = query.get('issue');
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [rating, setRating] = useState('');
 
  const fetchLocationAndHospitals = async (issue_id,specialty,issue,patient_id) => {
    try {
      const locationData = { lat: 43.41, lon: -80.55 }; //needs to be replaced with geolocation api
      const hospitalRes = await axios.get('/api/hospitals', {
        params: {
          lat: locationData.lat,
          lon: locationData.lon,
          issue_id,
          specialty,
          issue,
          patient_id
        },
      });
      console.log(hospitalRes.data);
      setHospitals(hospitalRes.data);
      setFilteredHospitals(hospitalRes.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  useEffect(() => {
    if (issue_id && specialty &&issue&&patient_id) {
      fetchLocationAndHospitals(issue_id,specialty,issue,patient_id);
    }
    console.log(issue_id);
    console.log(specialty);
    console.log(issue);
    console.log(patient_id);
  }, [issue_id,specialty,issue,patient_id]);

  useEffect(() => {
    const filtered = hospitals.filter((hospital) => {
      const withinDistance = hospital.distance <= maxDistance;
      const meetsRating = rating === '' || hospital.rating >= rating;
      return withinDistance && meetsRating;
    });
    setFilteredHospitals(filtered);
  }, [maxDistance, rating, hospitals]);

  // Function to fetch experts when a hospital is selected
  const fetchExperts = async (hosp_id,issue_id,patient_id) => {
    if (!issue_id || !patient_id || !hosp_id) return;
    try {
      const res = await axios.get(`/api/experts`, { params: { hosp_id,issue_id,patient_id } });
      setSelectedExperts(res.data);
    } catch (error) {
      console.error('Error fetching experts:', error);
    }
  };
  const handleCloseExpertCard = () => {
    setSelectedExperts([]);
  };

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
      />

      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
        <Box sx={{ flex: 2 }}>
          {filteredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.hosp_id}
              hosp_id={hospital.hosp_id}
              name={hospital.name}
              distance={hospital.distance}
              expertCount={hospital.expertCount}
              rating={hospital.rating}
              onSelectHospital={() => fetchExperts(hospital.hosp_id, issue_id, patient_id)}
              patient_id={patient_id}
              issue_id={issue_id}
              issue={issue}
              specialty={specialty}
            />
          ))}
        </Box>

        {/* Render Expert Card beside hospitals */}
        {selectedExperts.length > 0 && <ExpertCard experts={selectedExperts} onClose={handleCloseExpertCard} />}
      </Box>
    </Container>
  );
};

export default HospitalSearch;


