"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Transaction = ({ show }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get("token");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/transfer/transfermony`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // تحديد عدد المعاملات المعروضة بناءً على قيمة show
  const displayedTransactions = show
    ? transactions.slice(0, show)
    : transactions;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {displayedTransactions.length > 0 ? (
          displayedTransactions.map((transaction) => (
            <Link
              href={`/Components/transaction/${transaction._id}`}
              key={transaction._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-700 font-bold mb-2">
                Sender:{" "}
                <span className="text-gray-900">
                  {transaction.senderUsername}
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2">
                Receiver:{" "}
                <span className="text-gray-900">
                  {transaction.receiverUsername}
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2">
                Amount:{" "}
                <span className="text-green-500">
                  {transaction.amount.toLocaleString()} EGP
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2">
                Transaction Number:{" "}
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
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
