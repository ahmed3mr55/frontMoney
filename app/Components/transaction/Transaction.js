"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import io from "socket.io-client";

const Transaction = ({ show }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
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

    fetchTransactions();
  }, [token]);


  // تحديد عدد المعاملات المعروضة بناءً على قيمة show
  const displayedTransactions = show
    ? transactions.slice(0, show)
    : transactions;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 overflow-hidden">
        {displayedTransactions.length > 0 ? (
          displayedTransactions.map((transaction) => (
            <Link
              href={`/Components/transaction/${transaction._id}`}
              key={transaction._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700"
            >
              <p className="text-gray-700 font-bold mb-2 dark:text-slate-200">
                Sender:{" "}
                <span className="text-gray-900 dark:text-slate-100">
                  {transaction.senderUsername}
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2 dark:text-slate-200">
                Receiver:{" "}
                <span className="text-gray-900 dark:text-white">
                  {transaction.receiverUsername}
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2 dark:text-slate-200">
                Amount:{" "}
                <span className="text-green-500 dark:text-green-400">
                  {transaction.amount.toLocaleString()} EGP
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2 dark:text-slate-200">
                Transaction Number:{" "}
                <span className="text-green-500 dark:text-green-400">
                  {transaction._id.toLocaleString()}
                </span>
              </p>
              <p className="text-gray-700 font-bold mb-2 dark:text-slate-200">
                status:{" "}
                <span className="text-green-500 dark:text-green-400">{transaction.status}</span>
              </p>
              <p className="text-gray-500 text-sm dark:text-slate-400">
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
