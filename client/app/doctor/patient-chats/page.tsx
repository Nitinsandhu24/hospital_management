"use client";
import { axiosFetchDoctor } from "@/lib/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Appointment {
  _id: string;
  problem: string;
  time: string;
  progress: "toaccept" | "ongoing" | "done";
  patientId: string[];
  appointedDoctorId: string[];
}

export default function Page() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    axiosFetchDoctor(token)
      .get("/get-my-appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const markAsDone = async (appointmentId: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      await axiosFetchDoctor(token).post("/mark-done", {
        appointmentId,
      });

      alert("Marked as done!");

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, progress: "done" } : appt
        )
      );
    } catch (err) {
      console.error("Failed to mark as done:", err);
      alert("Failed to mark appointment as done.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>

      {appointments.filter((appt) => appt.progress !== "done").length === 0 ? (
        <p className="text-gray-500">No active appointments available</p>
      ) : (
        appointments
          .filter((appt) => appt.progress !== "done")
          .map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-700">
                  {appointment.problem}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(appointment.time).toLocaleString()}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {appointment.patientId.length > 0 ? (
                  <p>Patient ID: {appointment.patientId[0]}</p>
                ) : (
                  <p>No patient assigned</p>
                )}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {appointment.appointedDoctorId.length > 0 ? (
                  <p>Doctor Assigned: {appointment.appointedDoctorId[0]}</p>
                ) : (
                  <p>No doctor assigned</p>
                )}
              </div>

              <div className="mt-2 flex gap-4">
                <Link
                  href={`/chat/doctor/${appointment._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Chat
                </Link>

                {appointment.progress === "ongoing" && (
                  <button
                    onClick={() => markAsDone(appointment._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Mark as Done
                  </button>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
}
