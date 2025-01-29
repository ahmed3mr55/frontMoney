'use client';
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/password/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await req.json();
      if (req.ok) {
        console.log("Password reset link sent successfully");
        router.push("/auth/password/link-send");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    }finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center">
      {error && <p className="text-red-500">{error}</p>}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      <form className="flex flex-col gap-2 shadow-lg bg-slate-400 p-16 rounded-md mt-20" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <div className="flex flex-col">
            <label>Email Address</label>
          <input className="p-2 rounded " type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Send Reset Link</button>
        <p className="text-center text-sm ">If you encounter issues, please contact support.</p>
      </form>
    </div>
  );
};

export default page;
