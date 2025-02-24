import React from 'react';
import {Box, Typography, Paper} from '@mui/material';
import {Link} from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HealingIcon from '@mui/icons-material/Healing';

const ProfileSelection = () => {
  return (
    <Box
      sx={{
        minHeight: '91.5vh',
        bgcolor: '#f7f9f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 200,
          height: 200,
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
          width: 250,
          height: 250,
          bgcolor: '#c3d6c3',
          borderRadius: '50%',
          transform: 'translate(-50%, 50%)',
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#3e4b32',
            mb: 2,
          }}
        >
          Profile Management
        </Typography>
        <Typography variant="body1" sx={{color: '#7d8a6a', mb: 4}}>
          Choose what you’d like to update or view
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* View and Update Profile */}
          <Paper
            component={Link}
            to="/profile/view-profile"
            elevation={3}
            sx={{
              p: 3,
              width: 250,
              textAlign: 'center',
              textDecoration: 'none',
              bgcolor: '#d9e6da',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                bgcolor: '#c3d6c3',
              },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <PersonOutlineIcon sx={{fontSize: 40, color: '#3e4b32'}} />
            <Typography
              variant="h6"
              sx={{fontWeight: 'bold', color: '#3e4b32'}}
            >
              View Profile & Update
            </Typography>
          </Paper>

          {/* View and Update Medical History */}
          <Paper
            component={Link}
            to="/profile/medical-history"
            elevation={3}
            sx={{
              p: 3,
              width: 250,
              textAlign: 'center',
              textDecoration: 'none',
              bgcolor: '#d9e6da',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                bgcolor: '#c3d6c3',
              },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <HealingIcon sx={{fontSize: 40, color: '#3e4b32'}} />
            <Typography
              variant="h6"
              sx={{fontWeight: 'bold', color: '#3e4b32'}}
            >
              View & Update Medical History
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSelection;
