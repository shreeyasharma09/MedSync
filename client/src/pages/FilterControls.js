import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterControls = ({ maxDistance, setMaxDistance, rating, setRating }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        mb: 4,
        alignItems: 'center',
      }}
    >
      {/* Travel Distance Filter */}
      <FormControl
        variant="outlined"
        sx={{
          width: '48%',
          bgcolor: '#F5F7F2',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#6b7d5f' }, // Second darkest from palette
            '&:hover fieldset': { borderColor: '#6b7d5f' },
            '&.Mui-focused fieldset': { borderColor: '#6b7d5f' }, // When clicked
          },
        }}
      >
        <InputLabel>Max Distance</InputLabel>
        <Select
          value={maxDistance}
          onChange={(e) => setMaxDistance(e.target.value)}
          label="Max Distance"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#E1E9D8', // Background color of hospital cards
              },
            },
          }}
        >
          <MenuItem value={5}>5 km</MenuItem>
          <MenuItem value={10}>10 km</MenuItem>
          <MenuItem value={15}>Above 15 km</MenuItem>
        </Select>
      </FormControl>

      {/* Rating Filter */}
      <FormControl
        variant="outlined"
        sx={{
          width: '48%',
          bgcolor: '#F5F7F2',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#6b7d5f' },
            '&:hover fieldset': { borderColor: '#6b7d5f' },
            '&.Mui-focused fieldset': { borderColor: '#6b7d5f' },
          },
        }}
      >
        <InputLabel>Minimum Rating</InputLabel>
        <Select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          label="Minimum Rating"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#E1E9D8', // Background color of hospital cards
              },
            },
          }}
        >
          <MenuItem value="">All Ratings</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
          <MenuItem value={4}>4 Stars & Above</MenuItem>
          <MenuItem value={3}>3 Stars & Above</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterControls;


