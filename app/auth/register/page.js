"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

    useEffect(() => {
      if (Cookies.get("token")) {
        router.push("/");
      }
    },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            username,
            gender,
            dateOfBirth,
          }),
        }
      );
      const data = await req.json();
      if (req.ok) {
        Cookies.set("token", data.token);
        console.log("Registration successful");
        router.push("/");
        window.location.reload();
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full p-4">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          {error}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full max-w-2xl bg-slate-300 rounded-md p-8">
        <h2 className="font-bold text-2xl md:text-3xl text-center pb-6">
          Register Page
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">
                First Name
              </label>
              <input
                className="p-2 border border-gray-400 rounded-md"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">
                Last Name
              </label>
              <input
                className="p-2 border border-gray-400 rounded-md"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">Email</label>
              <input
                className="p-2 border border-gray-400 rounded-md"
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">Password</label>
              <input
                className="p-2 border border-gray-400 rounded-md"
                id="password"
                name="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">Username</label>
              <input
                className="p-2 border border-gray-400 rounded-md"
                id="username"
                name="username"
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">Gender</label>
              <select
                className="p-2 border border-gray-400 rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-base md:text-lg">
                Date of Birth
              </label>
              <input
                className="p-2 border border-gray-400 rounded-md"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="Your Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
