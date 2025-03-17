import React, {useState} from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Grid,
  TextField,
} from '@mui/material';
import {
  AddCircleOutline,
  DeleteOutline,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';

const MedicalHistory = () => {
  // Sample initial data
  const [allergies, setAllergies] = useState([
    'Peanuts',
    'Pollen',
    'Penicillin',
  ]);
  const [medications, setMedications] = useState([
    'Ibuprofen',
    'Metformin',
    'Amoxicillin',
  ]);
  const [treatments, setTreatments] = useState([
    'Knee Surgery (2020)',
    'Physical Therapy (2021)',
  ]);

  // Tracks pending new entries
  const [newEntry, setNewEntry] = useState({
    allergies: null,
    medications: null,
    treatments: null,
  });
  const [errors, setErrors] = useState({
    allergies: false,
    medications: false,
    treatments: false,
  });

  // Handlers for adding input fields
  const startAdding = category => {
    setNewEntry({...newEntry, [category]: ''});
    setErrors({...errors, [category]: false});
  };

  // Handles input change
  const handleInputChange = (e, category) => {
    setNewEntry({...newEntry, [category]: e.target.value});
    setErrors({...errors, [category]: false});
  };

  // Handles confirming the new entry
  const confirmAdd = (category, setter, items) => {
    if (!newEntry[category].trim()) {
      setErrors({...errors, [category]: true});
      return;
    }
    setter([...items, newEntry[category]]);
    setNewEntry({...newEntry, [category]: null});
  };

  // Cancels adding a new entry
  const cancelAdd = category => {
    setNewEntry({...newEntry, [category]: null});
    setErrors({...errors, [category]: false});
  };

  // Handlers for deleting records
  const deleteItem = (category, setter, index, items) => {
    setter(items.filter((_, i) => i !== index));
  };

  const sections = [
    {
      title: 'Allergies',
      category: 'allergies',
      items: allergies,
      setter: setAllergies,
    },
    {
      title: 'Medications',
      category: 'medications',
      items: medications,
      setter: setMedications,
    },
    {
      title: 'Past Treatments',
      category: 'treatments',
      items: treatments,
      setter: setTreatments,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f7f9f6',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          bgcolor: '#d9e6da',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 300,
          height: 300,
          bgcolor: '#c3d6c3',
          borderRadius: '50%',
          transform: 'translate(-50%, 50%)',
          zIndex: 0,
        }}
      />

      <Box sx={{position: 'relative', zIndex: 1, width: '100%', maxWidth: 800}}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: '#f7f9f6',
          }}
        >
          <Typography
            variant="h5"
            sx={{fontWeight: 'bold', mb: 3, color: '#3e4b32'}}
          >
            Medical History
          </Typography>

          {sections.map((section, index) => (
            <Box key={index} mb={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{fontWeight: 'bold', color: '#3e4b32'}}
                >
                  {section.title}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={() => startAdding(section.category)}
                  disabled={newEntry[section.category] !== null}
                  sx={{
                    bgcolor: '#9AAE9A',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {bgcolor: '#79886C'},
                  }}
                >
                  Add
                </Button>
              </Box>

              {section.items.length === 0 &&
              newEntry[section.category] === null ? (
                <Typography sx={{color: '#7d8a6a', fontStyle: 'italic'}}>
                  No records found.
                </Typography>
              ) : (
                <Grid container spacing={1}>
                  {section.items.map((item, itemIndex) => (
                    <Grid item xs={12} key={itemIndex}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          bgcolor: 'white',
                          borderRadius: 1,
                        }}
                      >
                        <Typography sx={{color: '#3e4b32'}}>{item}</Typography>
                        <IconButton
                          onClick={() =>
                            deleteItem(
                              section.category,
                              section.setter,
                              itemIndex,
                              section.items,
                            )
                          }
                          sx={{color: '#d9534f'}}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

              {newEntry[section.category] !== null && (
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'white',
                        borderRadius: 1,
                        gap: 1,
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder={`Enter new ${section.title.toLowerCase()}...`}
                        value={newEntry[section.category]}
                        onChange={e => handleInputChange(e, section.category)}
                        error={errors[section.category]}
                        helperText={
                          errors[section.category]
                            ? 'This field cannot be empty'
                            : ''
                        }
                      />
                      <IconButton
                        onClick={() =>
                          confirmAdd(
                            section.category,
                            section.setter,
                            section.items,
                          )
                        }
                        color="success"
                      >
                        <CheckCircleOutline />
                      </IconButton>
                      <IconButton
                        onClick={() => cancelAdd(section.category)}
                        color="warning"
                      >
                        <CancelOutlined />
                      </IconButton>
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default MedicalHistory;
