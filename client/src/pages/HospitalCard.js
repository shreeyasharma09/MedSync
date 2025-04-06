import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Chip, Stack, CardHeader, Avatar } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PlaceIcon from '@mui/icons-material/Place';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ hosp_id, name, distance, expertCount, rating, onSelectHospital }) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 600,
        mb: 3,
        boxShadow: 3,
        bgcolor: '#F5F7F2',
        borderRadius: 3,
        p: 1,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#D32F2F', width: 40, height: 40 }}>
            <LocalHospitalIcon sx={{ color: 'white' }} />
          </Avatar>
        }
        title={
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: '#2C3A1F',
              fontWeight: 700,
              letterSpacing: 0.8,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {name}
          </Typography>
        }
      />

      <CardContent>
        <Stack direction="row" spacing={1} mt={1}>
          <Chip
            icon={<PlaceIcon sx={{ color: '#3e4b32 !important' }} />}
            label={`${distance} km away`}
            sx={{
              bgcolor: '#ffffff',
              color: '#3e4b32',
              borderColor: '#B5C7A3',
              fontSize: '0.875rem',
            }}
            variant="outlined"
          />
          <Chip
            icon={<MedicalInformationIcon sx={{ color: '#3e4b32 !important' }} />}
            label={`${expertCount} Expert(s) Available`}
            sx={{
              bgcolor: '#ffffff',
              color: '#3e4b32',
              borderColor: '#B5C7A3',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
            variant="outlined"
            onClick={() => onSelectHospital(hosp_id)} // Call function to fetch experts
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-start', pl: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="medium"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            bgcolor: '#3E4B32',
            '&:hover': { bgcolor: '#2f3b26' },
            borderRadius: 2,
            px: 2.5,
            py: 1,
          }}
          onClick={()=> navigate('/patient-bookings')}
        >
          Book Appointment with an Expert
        </Button>
      </CardActions>
    </Card>
  );
};

export default HospitalCard;





