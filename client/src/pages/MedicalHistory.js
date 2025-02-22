import React, { useState } from "react";
import { Box, Typography, Paper, Button, IconButton, Grid, TextField } from "@mui/material";
import { AddCircleOutline, DeleteOutline, CheckCircleOutline, CancelOutlined } from "@mui/icons-material";

const MedicalHistory = () => {
  // Sample initial data
  const [allergies, setAllergies] = useState(["Peanuts", "Pollen", "Penicillin"]);
  const [medications, setMedications] = useState(["Ibuprofen", "Metformin", "Amoxicillin"]);
  const [treatments, setTreatments] = useState(["Knee Surgery (2020)", "Physical Therapy (2021)"]);

  // Tracks pending new entries
  const [newEntry, setNewEntry] = useState({ allergies: null, medications: null, treatments: null });
  const [errors, setErrors] = useState({ allergies: false, medications: false, treatments: false });

  // Handlers for adding input fields
  const startAdding = (category) => {
    setNewEntry({ ...newEntry, [category]: "" });
    setErrors({ ...errors, [category]: false }); // Reset error when starting input
  };

  // Handles input change
  const handleInputChange = (e, category) => {
    setNewEntry({ ...newEntry, [category]: e.target.value });
    setErrors({ ...errors, [category]: false }); // Clear error when typing
  };

  // Handles confirming the new entry
  const confirmAdd = (category, setter, items) => {
    if (!newEntry[category].trim()) {
      setErrors({ ...errors, [category]: true }); // Show error only on confirm
      return;
    }

    setter([...items, newEntry[category]]);
    setNewEntry({ ...newEntry, [category]: null }); // Reset input field
  };

  // Cancels adding a new entry
  const cancelAdd = (category) => {
    setNewEntry({ ...newEntry, [category]: null });
    setErrors({ ...errors, [category]: false }); // Reset error
  };

  // Handlers for deleting records
  const deleteItem = (category, setter, index, items) => {
    setter(items.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f7f9f6">
      <Paper
        elevation={1}
        sx={{
          p: "2rem",
          width: "100%",
          maxWidth: "700px",
          bgcolor: "#f7f9f6",
          border: "1px solid #b0b8a6",
          borderRadius: "8px",
          boxShadow: "none",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Medical History
        </Typography>

        {/* Sections for Allergies, Medications, Past Treatments */}
        {[
          { title: "Allergies", category: "allergies", items: allergies, setter: setAllergies },
          { title: "Medications", category: "medications", items: medications, setter: setMedications },
          { title: "Past Treatments", category: "treatments", items: treatments, setter: setTreatments },
        ].map((section, index) => (
          <Box key={index} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">{section.title}</Typography>
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={() => startAdding(section.category)}
                disabled={newEntry[section.category] !== null} // Disable button if input is active
                sx={{
                  bgcolor: "#6a9c78",
                  color: "white",
                  "&:hover": { bgcolor: "#5a8c68" },
                }}
              >
                Add
              </Button>
            </Box>

            {/* List of items or 'No records found' */}
            {section.items.length === 0 && newEntry[section.category] === null ? (
              <Typography sx={{ color: "#8a8a8a", fontStyle: "italic", mt: 1 }}>No records found.</Typography>
            ) : (
              <Grid container spacing={1} mt={1}>
                {section.items.map((item, itemIndex) => (
                  <Grid item xs={12} key={itemIndex}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "white",
                        borderRadius: "6px",
                      }}
                    >
                      <Typography>{item}</Typography>
                      <IconButton onClick={() => deleteItem(section.category, section.setter, itemIndex, section.items)} color="error">
                        <DeleteOutline />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Input field for adding a new record */}
            {newEntry[section.category] !== null && (
              <Grid container spacing={1} mt={1}>
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "white",
                      borderRadius: "6px",
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder={`Enter new ${section.title.toLowerCase()}...`}
                      value={newEntry[section.category]}
                      onChange={(e) => handleInputChange(e, section.category)}
                      error={errors[section.category]} 
                      helperText={errors[section.category] ? "This field cannot be empty" : ""}
                    />
                    <IconButton
                      onClick={() => confirmAdd(section.category, section.setter, section.items)}
                      color="success"
                    >
                      <CheckCircleOutline />
                    </IconButton>
                    <IconButton onClick={() => cancelAdd(section.category)} color="warning">
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
  );
};

export default MedicalHistory;


