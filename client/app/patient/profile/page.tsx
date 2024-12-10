"use client";
import React, { useEffect, useState } from "react";
import { axiosFetchPatient } from "@/lib/axiosConfig";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  CakeIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token: any = localStorage.getItem("token");
        axiosFetchPatient(token)
          .get("/user-profile")
          .then((response) => {
            setUser(response.data.user);
            setLoading(false);
          });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  const getProfileImage = (gender: string) => {
    if (gender.toLowerCase() === "male") {
      return "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg";
    } else if (gender.toLowerCase() === "female") {
      return "https://static.vecteezy.com/system/resources/previews/004/899/680/non_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center max-w-3xl w-full">
        {/* Profile Image */}
        <img
          src={getProfileImage(user.gender)}
          alt="Profile"
          className="w-40 h-40 rounded-full mb-6 object-cover border-4 border-blue-200 shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {user.name}'s Profile
        </h1>
        {/* User Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="flex items-center">
            <IdentificationIcon className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-600">
              <strong>Name:</strong> {user.name}
            </p>
          </div>
          <div className="flex items-center">
            <MailIcon className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-600">
              <strong>Mobile:</strong> {user.mobile}
            </p>
          </div>
          <div className="flex items-center">
            <CakeIcon className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-600">
              <strong>Age:</strong> {user.age}
            </p>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-600">
              <strong>Date of Birth:</strong> {user.dob}
            </p>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-600">
              <strong>Gender:</strong> {user.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
