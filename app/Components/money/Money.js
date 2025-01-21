'use client';
import React from "react";

const Money = ({ balance }) => {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 rounded-lg shadow-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">Current Balance</h3>
        <h3 className="text-2xl font-bold mt-2">
          EGP{" "}
          <span className="font-bold">
            {balance !== null ? balance.toLocaleString() : "Loading..."}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Money;
