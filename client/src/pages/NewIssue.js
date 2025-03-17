import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, Container, Paper } from '@mui/material';

// List of medical specialties
const specialties = [
  'Emergency Medicine',
  'Intensive Care (Critical Care Medicine)',
  'Internal Medicine',
  'Cardiology',
  'Pulmonology',
  'Gastroenterology',
  'Nephrology',
  'Endocrinology',
  'Hematology',
  'Infectious Disease',
  'Rheumatology',
  'General Surgery',
  'Cardiothoracic Surgery',
  'Neurosurgery',
  'Orthopedic Surgery',
  'Plastic & Reconstructive Surgery',
  'Otolaryngology (ENT)',
  'Urology',
  'Vascular Surgery',
  'Obstetrics & Gynecology (OB/GYN)',
  'Pediatrics',
  'Neonatology',
  'Neurology',
  'Psychiatry',
  'Oncology',
  'Radiation Oncology',
  'Palliative Care',
  'Radiology',
  'Interventional Radiology',
  'Pathology',
  'Anesthesiology',
];

// Specialty descriptions
const specialtyDescriptions = {
  'Emergency Medicine': 'Handles urgent and life-threatening conditions in the ER.',
  'Intensive Care (Critical Care Medicine)': 'Manages patients in the ICU needing constant monitoring.',
  'Internal Medicine': 'Focuses on preventing, diagnosing, and treating adult diseases.',
  'Cardiology': 'Specializes in heart-related conditions like hypertension and heart attacks.',
  'Pulmonology': 'Deals with lung conditions like asthma, COPD, and pneumonia.',
  'Gastroenterology': 'Manages digestive issues like acid reflux, IBS, and liver diseases.',
  'Nephrology': 'Specializes in kidney diseases, dialysis, and high blood pressure.',
  'Endocrinology': 'Handles hormone-related issues such as diabetes and thyroid disorders.',
  'Hematology': 'Deals with blood disorders like anemia, leukemia, and clotting issues.',
  'Infectious Disease': 'Treats bacterial, viral, and parasitic infections such as COVID-19 and HIV.',
  'Rheumatology': 'Manages autoimmune diseases like arthritis and lupus.',
  'General Surgery': 'Performs surgeries for appendicitis, hernias, and other conditions.',
  'Cardiothoracic Surgery': 'Conducts heart and lung surgeries, including bypass surgery.',
  'Neurosurgery': 'Handles brain and spinal surgeries for conditions like tumors or injuries.',
  'Orthopedic Surgery': 'Deals with bones, joints, and sports injuries.',
  'Plastic & Reconstructive Surgery': 'Performs cosmetic and reconstructive surgeries.',
  'Otolaryngology (ENT)': 'Treats ear, nose, and throat conditions, including allergies and sinus infections.',
  'Urology': 'Specializes in urinary and reproductive system issues.',
  'Vascular Surgery': 'Manages blood vessel conditions like varicose veins and aneurysms.',
  'Obstetrics & Gynecology (OB/GYN)': 'Cares for women’s reproductive health and pregnancy.',
  'Pediatrics': 'Provides healthcare for infants, children, and adolescents.',
  'Neonatology': 'Focuses on the care of premature and sick newborns.',
  'Neurology': 'Treats brain and nervous system conditions like migraines and epilepsy.',
  'Psychiatry': 'Manages mental health conditions such as anxiety and depression.',
  'Oncology': 'Treats various types of cancer and provides chemotherapy.',
  'Radiation Oncology': 'Uses radiation therapy to treat cancers.',
  'Palliative Care': 'Provides comfort care for patients with serious illnesses.',
  'Radiology': 'Interprets imaging studies like X-rays, MRIs, and CT scans.',
  'Interventional Radiology': 'Performs minimally invasive procedures guided by imaging.',
  'Pathology': 'Examines tissue samples to diagnose diseases like cancer.',
  'Anesthesiology': 'Manages pain and sedation during surgeries and procedures.',
};

export default function NewIssue() {
  const [formData, setFormData] = useState({
    issue: '',
    severity: '',
    details: '',
    specialty: '',
  });

  const [showDescriptions, setShowDescriptions] = useState(false);
  const navigate = useNavigate();
  const patient_id = 1; // Replace with actual logged-in user ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id, ...formData }),
    });

    if (response.ok) {
      navigate('/old-issues'); // Redirect to old issues after submission
    } else {
      console.error('Failed to submit issue');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={1} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Describe Your Issue
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Issue"
            name="issue"
            variant="outlined"
            value={formData.issue}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Severity (1-10)"
            name="severity"
            variant="outlined"
            value={formData.severity}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          >
            {[...Array(10).keys()].map(num => (
              <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Details"
            name="details"
            variant="outlined"
            multiline
            rows={3}
            value={formData.details}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Select Specialty"
            name="specialty"
            variant="outlined"
            value={formData.specialty}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          >
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>{specialty}</MenuItem>
            ))}
          </TextField>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ bgcolor: '#3E4B32', '&:hover': { bgcolor: '#2f3b26' } }}
          >
            Submit Issue
          </Button>
        </form>

        {/* Show/Hide Specialty Information */}
        <Box mt={4}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowDescriptions(!showDescriptions)}
            sx={{ borderColor: '#3E4B32', color: '#3E4B32' }}
          >
            {showDescriptions ? 'Hide Specialty Information' : 'Show Specialty Information'}
          </Button>

          {showDescriptions && (
            <Paper sx={{ p: 3, mt: 2, bgcolor: '#E1E9D8', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3E4B32' }}>
                What Specialties Mean:
              </Typography>
              {Object.entries(specialtyDescriptions).map(([key, value]) => (
                <Box key={key} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2f3b26' }}>
                    {key}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7d8a6a' }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
