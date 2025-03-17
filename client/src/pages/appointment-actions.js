// This would normally be a server action, but for UI demo purposes
// im going to make it a client-side function with simulated database operations

// Simulated database of appointments
let appointments = [
  {
    id: 1,
    doctorName: 'Dr. Emily Chen',
    specialty: 'Cardiology',
    date: '25-03-2025',
    time: '09:30',
  },
  {
    id: 2,
    doctorName: 'Dr. Jessica Kim',
    specialty: 'Dermatology',
    date: '02-04-2025',
    time: '14:15',
  },
];

// Get all appointments
export async function getAppointments() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...appointments];
}

// Update an appointment
export async function updateAppointment({id, date, time}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find and update the appointment
  appointments = appointments.map(appointment =>
    appointment.id === id ? {...appointment, date, time} : appointment,
  );

  return {success: true};
}

// Delete an appointment
export async function deleteAppointment(id) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Remove the appointment
  appointments = appointments.filter(appointment => appointment.id !== id);

  return {success: true};
}

// In a real application, these functions would connect to MySQL:
