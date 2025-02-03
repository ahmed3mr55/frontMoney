"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [massege, setMassege] = useState("");

  // استخدام useEffect لإعادة التوجيه عند وجود توكن
  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/");
    }
  },[]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (massege) {
      const timer = setTimeout(() => {
        setMassege(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [massege]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await req.json();

      if (req.ok) {
        Cookies.set("token", data.token);
        setMassege("Login successful");
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
      {massege && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          {massege}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full max-w-md bg-slate-300 rounded-md p-8 shadow-lg dark:bg-slate-800">
        <h2 className="font-bold text-2xl md:text-3xl text-center pb-6">Login Page</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-bold text-base md:text-lg">Email</label>
            <input
              className="p-2 border border-gray-400 rounded-md dark:bg-slate-600"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-base md:text-lg">Password</label>
            <input
              className="p-2 border border-gray-400 rounded-md dark:bg-slate-600"
              id="password"
              name="password"
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center text-sm md:text-base">
            <Link className="text-blue-600 hover:underline" href="password/forgot-password">
              Forgot Password?
            </Link>
            <Link className="text-blue-600 hover:underline" href="register">
              Register
            </Link>
          </div>
          <button
            className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 transition-colors"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
