"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { axiosFetchDoctor } from '@/lib/axiosConfig';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);

  const fetchAppointments = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('No token found.');
      }
      const response = await axiosFetchDoctor(token).get("/get-all-appointments");
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, change]);
  
  const treated = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosFetchDoctor(token).post("/update-appointment", {
        appointmentId: id
      });
      if (res.status === 200) {
        setChange(prev => !prev);
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  return (
    <div className="pt-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Upcoming Appointments</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {appointment.progress.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{appointment.problem}</h2>
                <p className="text-gray-600">Patient Name: {appointment.patientId.name}</p>
                <p className="text-gray-600">Time: {appointment.time}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => treated(appointment._id)}
              >
                Treat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;