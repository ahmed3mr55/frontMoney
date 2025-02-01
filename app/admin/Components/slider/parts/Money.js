"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Money = () => {
  const token = Cookies.get("token");
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMoney = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/total-wallet-balance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMoney(data.totalBalance);
        setError("");
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
    fetchMoney();
  }, []);

  // دالة لتحويل الرقم إلى صيغة مختصرة
  const formatMoney = (amount) => {
    if (amount < 1000) {
      return amount.toString();
    }
    if (amount < 1000000) {
      return (amount / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    if (amount < 1000000000) {
      return (amount / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    // إذا كان المبلغ أكبر من أو يساوي مليار
    return (amount / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  };

  return (
    <div className="w-20 h-20 bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 rounded flex flex-col justify-center items-center cursor-pointer">
      <h3 className="text-center">Current Balance</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-xs">{error}</p>
      ) : (
        <p>{formatMoney(money)}</p>
      )}
    </div>
  );
};

export default Money;
