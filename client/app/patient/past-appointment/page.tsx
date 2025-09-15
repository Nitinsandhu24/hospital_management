"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { axiosFetchPatient } from "@/lib/axiosConfig";

// TypeScript interface for appointment object
interface Appointment {
  _id: string;
  appointedDoctorId?: {
    name: string;
  };
  problem: string;
  time: string;
  progress: string;
}

export default function PastAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await axiosFetchPatient(token).get("/past-appointments");
      setAppointments(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Past Appointments
      </h1>
      {appointments.length === 0 ? (
        <p className="text-gray-600 text-center">No past appointments found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Doctor: {appointment.appointedDoctorId?.name || "Not Assigned"}
              </h2>
              <p className="text-gray-800 mb-3">{appointment.problem}</p>
              <div className="flex items-center mb-2 text-gray-600">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{new Date(appointment.time).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mb-4 text-gray-600">
                <Clock className="mr-2 h-5 w-5" />
                <span>{new Date(appointment.time).toLocaleTimeString()}</span>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                {appointment.progress}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
