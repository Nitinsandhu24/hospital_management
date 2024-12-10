"use client";

import React, { useEffect, useState } from "react";
import { axiosFetchDoctor } from "@/lib/axiosConfig";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axiosFetchDoctor(token).get("/user-profile");
          setUser(response.data.user);
          setLoading(false);
        } else {
          setError("No token found.");
          setLoading(false);
        }
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
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const getProfileImage = (gender: string) => {
    if (gender.toLowerCase() === "male") {
      return "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg";
    } else if (gender.toLowerCase() === "female") {
      return "https://static.vecteezy.com/system/resources/previews/004/899/680/non_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg";
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-8 flex flex-col items-center">
        <img
          src={getProfileImage(user.gender)}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-6 border-2 border-blue-500 object-cover"
        />
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Doctor Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <ProfileField
            icon={<IdentificationIcon className="h-6 w-6 text-blue-500" />}
            label="Name"
            value={user.name}
          />
          <ProfileField
            icon={<MailIcon className="h-6 w-6 text-blue-500" />}
            label="Email"
            value={user.email}
          />
          <ProfileField
            icon={<PhoneIcon className="h-6 w-6 text-blue-500" />}
            label="Mobile"
            value={user.mobile}
          />
          <ProfileField
            icon={<UserIcon className="h-6 w-6 text-blue-500" />}
            label="Gender"
            value={user.gender}
          />
          <ProfileField
            icon={<CalendarIcon className="h-6 w-6 text-blue-500" />}
            label="Experience"
            value={`${user.experience} years`}
          />
          <ProfileField
            icon={<CalendarIcon className="h-6 w-6 text-blue-500" />}
            label="Specialization"
            value={user.specialization}
          />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
    {icon}
    <div className="ml-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default UserProfile;
