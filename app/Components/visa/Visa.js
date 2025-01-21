"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Visa = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVisa = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/visa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setVisa(data);
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
      fetchVisa();
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl h-48 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 rounded-lg shadow-xl flex justify-between p-6 text-white">
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {visa?.firstName} {visa?.lastName}
            </h3>
            <p className="text-sm opacity-80">Name</p>
            <h3 className="text-lg font-semibold mt-1">
              {visa?.cardNumber}
            </h3>
            <p className="text-sm opacity-80">Card Number</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <h3 className="text-sm">CVV: {visa?.cvv}</h3>
              <p className="text-xs opacity-80">Security Code</p>
            </div>
            <div>
              <h3 className="text-sm">
                Expiry:{" "}
                {visa?.expiryDate}
              </h3>
              <p className="text-xs opacity-80">Expiration Date</p>
            </div>
          </div>
        </div>
        <p className="text-sm">
          {visa?.status ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default Visa;
