"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Users = () => {
  const token = Cookies.get("token");
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // دالة لجلب عدد المستخدمين
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/length-users`,
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
        setTotalUsers(data.totalUsers);
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
    fetchUsers();
  }, []);

  // دالة لتحويل الرقم لصيغة مختصرة
  const formatNumber = (num) => {
    if (num >= 1000000) {
      // لتحويل مثلاً 2000000 إلى 2M
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      // لتحويل مثلاً 10000 إلى 10k
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  };

  return (
    <div className="w-20 h-20 bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 rounded flex flex-col justify-center items-center cursor-pointer">
      <h3 className="text-center">Users</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-xs">{error}</p>
      ) : (
        <p>{formatNumber(totalUsers)}</p>
      )}
    </div>
  );
};

export default Users;
