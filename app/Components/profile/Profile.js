"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    } else {
      fetchUser();
    }
  }, [token, router]);

  return (
    <div className="">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-md shadow-lg animate-pulse">
          {error}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-70"></div>
        </div>
      )}
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          User Profile
        </h1>
        {profile ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.firstName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-sm text-gray-500">@{profile.username}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 text-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-medium">Email:</span>
                <span className="text-gray-600">{profile.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Gender:</span>
                <span className="capitalize text-gray-600">{profile.gender}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
