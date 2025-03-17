import React from 'react';
import { Card, CardContent, Typography, CardHeader, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

const ExpertCard = ({ experts, onClose }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 350,
        boxShadow: 3,
        bgcolor: '#E8F5E9',
        borderRadius: 3,
        p: 1,
        ml: 3, // Position beside HospitalCard
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#2E7D32' }}>
            <PersonIcon sx={{ color: 'white' }} />
          </Avatar>
        }
        title={
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#2C3A1F',
              fontWeight: 700,
              letterSpacing: 0.8,
            }}
          >
            Experts Available
          </Typography>
        }
        action={
          <IconButton onClick={onClose} sx={{ color: '#D32F2F' }}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <TableContainer component={Paper} sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#A5D6A7' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#2C3A1F' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2C3A1F' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2C3A1F' }}>Specialty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {experts.length > 0 ? (
                experts.map((expert, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{expert.first_name} {expert.last_name}</TableCell>
                    <TableCell>{expert.specialty}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center', color: '#D32F2F' }}>
                    No experts available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ExpertCard;


