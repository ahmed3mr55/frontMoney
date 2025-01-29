"use client";
import React from "react";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 3000);
  });
  return (
    <div className="flex items-center justify-center">
      <div className=" mt-20 text-center bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          You have successfully changed your password!
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Please click the button below to log in to your account.
        </p>
        <a
          href="/auth/login"
          className="inline-block mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-md text-sm hover:bg-green-600 transition-colors"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default page;
