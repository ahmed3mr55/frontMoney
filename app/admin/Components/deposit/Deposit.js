"use client";
import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Deposit = ({ onClose }) => {
  const token = Cookies.get("token");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmDeposit = async () => {
    setShowConfirmation(false);
    setLoading(true);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/transactions/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: Number(amount), username }),
        }
      );
      const data = await req.json();
      if (req.ok) {
        setSuccess(true);
        setError(null);
        setAmount("");
        setUsername("");
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
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  });
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  const handleDeposit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };
  return (
    <div className=" flex-col p-6 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center dark:bg-opacity-50 z-30">
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Deposit successful</span>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {loading && (
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Loading...</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 flex flex-col gap-6 w-full md:flex-row md:items-center md:justify-between max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left dark:text-white">
          Deposit Money
        </h2>
        <form
          className="flex flex-wrap gap-4 w-full md:flex-row md:gap-6 items-center justify-center"
          onSubmit={handleDeposit}
        >
          <input
            className="flex-1 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-700 dark:text-white"
            type="number"
            placeholder="Amount (EGP)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="flex-1 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="Recipient Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            type="submit"
          >
            Deposit
          </button>
          <div className="w-full md:w-auto flex justify-center">
            <div
              className="bg-red-500 hover:bg-red-600 text-center text-white font-bold py-3 px-6 rounded-md transition-all duration-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center dark:bg-opacity-50 z-30">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md dark:bg-gray-800 z-40 ">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Confirm Deposit
            </h2>
            <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to Deposit <strong>{amount} EGP</strong> to{" "}
              <strong>{username}</strong>?
            </p>
            <div className="flex justify-end gap-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                onClick={confirmDeposit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
