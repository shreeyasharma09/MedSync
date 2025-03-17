"use client"

import { useState, useEffect } from "react"
import { Box, Typography, CircularProgress } from "@mui/material"
import { AppointmentCard } from "./appointment-card"
import { getAppointments } from "./appointment-actions"

export function AppointmentsSection() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Load appointments on component mount
  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await getAppointments()
      setAppointments(data)
    } catch (error) {
      console.error("Failed to load appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderRadius: 1,
          border: "1px solid #d2d2d2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={24} sx={{ color: "#3e4b32", mr: 2 }} />
        <Typography sx={{ color: "#7d8a6a" }}>Loading appointments...</Typography>
      </Box>
    )
  }

  if (appointments.length === 0) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderRadius: 1,
          border: "1px solid #d2d2d2",
        }}
      >
        <Typography sx={{ color: "#7d8a6a", mb: 0.5 }}>You don't have any upcoming appointments scheduled.</Typography>
        <Typography variant="body2" sx={{ color: "#9c9c9c" }}>
          Click the "Book Appointment" button above to schedule one.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} onUpdate={loadAppointments} />
      ))}
    </Box>
  )
}

