"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Update from "./update/Update"; // تأكد أن مسار الاستيراد صحيح

const Users = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (searchQuery = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/getallusers?search=${encodeURIComponent(
          searchQuery
        )}`,
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
        // نتوقع أن يعيد الباك إند كائن يحتوي على { users, totalUsers }
        setUsers(data.users);
        setError("");
      } else {
        setError(data.message || "An error occurred");
        console.error(data.message);
      }
    } catch (error) {
      setError(error.message || "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // عند تحميل الصفحة، نجلب جميع المستخدمين
  useEffect(() => {
    fetchUsers();
  }, []);

  // دالة البحث عند الضغط على زر البحث
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  // دالة فتح النافذة وتعيين المستخدم المحدد
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // دالة إغلاق النافذة
  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by username, email, name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full sm:w-1/4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                  #
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                  Name
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                  Email
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                  Username
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                  isAdmin
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                  Money
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleOpenModal(user)}
                >
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 dark:text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 dark:text-white">
                    {user.username}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 dark:text-white">
                    {user.isAdmin ? "true" : "false"}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 dark:text-white">
                    {user.money} EGP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openModal && selectedUser && (
        <Update id={selectedUser._id} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Users;
