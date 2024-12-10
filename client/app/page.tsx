"use client";

import Link from "next/link";
import { useState } from "react";
import { axiosFetch } from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formType, setFormType] = useState<"patient" | "doctor">("patient");
  const [action, setAction] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="flex mb-4">
            <button
              onClick={() => setFormType("patient")}
              className={`px-4 py-2 rounded-l-lg transition duration-300 ${
                formType === "patient"
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setFormType("doctor")}
              className={`px-4 py-2 rounded-r-lg transition duration-300 ${
                formType === "doctor"
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Doctor
            </button>
          </div>
          <div className="flex mb-4">
            <button
              onClick={() => setAction("login")}
              className={`px-4 py-2 rounded-l-lg transition duration-300 ${
                action === "login"
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAction("signup")}
              className={`px-4 py-2 rounded-r-lg transition duration-300 ${
                action === "signup"
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center m-2">
          <Link
            href={"/auth/reset-password"}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="h-[20rem] overflow-y-auto pr-4">
          {formType === "patient" && action === "login" && <PatientLogin />}
          {formType === "patient" && action === "signup" && <PatientSignup />}
          {formType === "doctor" && action === "login" && <DoctorSignin />}
          {formType === "doctor" && action === "signup" && <DoctorSignup />}
        </div>
      </div>
    </div>
  );
}

const PatientLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosFetch.post("/patient-auth/login", formData);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.data.token);
        alert("Logged in Successfully");
        router.push("/patient/profile");
      }
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg ```javascript
-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    gender: "",
    age: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosFetch.post("/patient-auth/signup", formData);
      if (res.status === 200) {
        alert("Patient Signed up Successfully");
      }
    } catch (err) {
      alert("Sign up failed");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="mobile" className="block mb-1 font-medium">
          Mobile:
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dob" className="block mb-1 font-medium">
          DOB:
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender" className="block mb-1 font-medium">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="age" className="block mb-1 font-medium">
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Signup
      </button>
    </form>
  );
};

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    specialization: "",
    gender: "",
    experience: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosFetch.post("/doctor-auth/signup", {
        formData,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        alert("Doctor Signed up Successfully");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="mobile" className="block mb-1 font-medium">
          Mobile:
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="specialization" className="block mb-1 font-medium">
          Specialization:
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender" className="block mb-1 font-medium">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="experience" className="block mb-1 font-medium">
          Experience (years):
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Signup
      </button>
    </form>
  );
};

const DoctorSignin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosFetch.post("/doctor-auth/login", {
        formData,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        alert("Doctor Signed in Successfully");
        navigate.push("/doctor/profile");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};
