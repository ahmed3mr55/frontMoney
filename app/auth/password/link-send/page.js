"use client";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center">
      <div className=" mt-20 flex flex-col items-center gap-4 bg-green-200 p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-800">Link for Reset Password Sent</h3>
        <h2 className="text-base text-gray-600">Please check your email inbox.</h2>
        <div className="text-sm text-gray-500 mt-4">
          <p>If you don't see the email, check your spam folder or contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
