'use client'
import { axiosFetchDoctor } from "@/lib/axiosConfig"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token") || ""
        axiosFetchDoctor(token)
            .get('/get-my-appointments')
            .then((response) => {
                setAppointments(response.data)  // Assuming response.data holds the appointments
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error)
            })
    }, [])

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
            {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments available</p>
            ) : (
                appointments.map((appointment:any) => (
                    <div
                        key={appointment._id}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-medium text-gray-700">{appointment.problem}</h2>
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
                        <div className="mt-2">
                            <Link href={"/chat/doctor/"+ appointment._id} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                              chat
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
