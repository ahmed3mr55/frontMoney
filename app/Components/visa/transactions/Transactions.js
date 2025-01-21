"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Transactions = () => {
  const token = Cookies.get("token");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTransactions(data);
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
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 flex flex-col justify-start">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-700 font-bold mb-2">
                Amount:{" "}
                <span className="text-green-500">
                  {transaction.amount.toLocaleString()} EGP
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2">
                Transaction ID:{" "}
                <span className="text-green-500">
                  {transaction._id.toLocaleString()}
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2">
                status:{" "}
                <span className="text-green-500">{transaction.status}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Date: {new Date(transaction.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
