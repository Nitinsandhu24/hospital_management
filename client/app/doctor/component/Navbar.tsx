"use client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const navigate = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-lg flex items-center justify-between px-8 z-50 border-b border-gray-200">
      <div className="text-2xl font-extrabold text-blue-600 tracking-wide">
        Doctor Dashboard
      </div>
      <div className="flex space-x-6">
        <button
          className="text-gray-700 hover:text-blue-500 font-medium transition duration-200"
          onClick={() => {
            navigate.push("/doctor/global-appointments");
          }}
        >
          Global Appointments
        </button>
        <button
          className="text-gray-700 hover:text-blue-500 font-medium transition duration-200"
          onClick={() => {
            window.location.href = "/doctor/patient-chats";
          }}
        >
          Patient Chats
        </button>
        <button
          className="text-gray-700 hover:text-blue-500 font-medium transition duration-200"
          onClick={() => {
            window.location.href = "/doctor/watch-reviews";
          }}
        >
          Watch Reviews
        </button>
        <button
          className="text-gray-700 hover:text-blue-500 font-medium transition duration-200"
          onClick={() => {
            navigate.push("/doctor/profile");
          }}
        >
          Profile
        </button>
        <button
          className="text-gray-700 hover:text-red-500 font-medium transition duration-200"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
