"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Update from "./update/Update";

const Users = ({ show }) => {
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
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/getallusers?search=${encodeURIComponent(searchQuery)}`,
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
        setUsers(data.users);
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const displayedUsers = show ? users.slice(0, show) : users;

  return (
    <div className="p-2 sm:p-4">
      {error && <p className="text-red-500 mb-4 text-xs sm:text-sm">{error}</p>}
      
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs sm:text-sm"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-xs sm:text-sm">Loading...</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">#</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Name</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Email</th>
                <th className="hidden sm:table-cell px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Username</th>
                <th className="hidden sm:table-cell px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">isAdmin</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Money</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleOpenModal(user)}
                  >
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">{index + 1}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                      <div className="flex flex-col">
                        <span>{user.firstName} {user.lastName}</span>
                        <span className="sm:hidden text-gray-500">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm break-all">{user.email}</td>
                    <td className="hidden sm:table-cell px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">{user.username}</td>
                    <td className="hidden sm:table-cell px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                      {user.isAdmin ? "✔️" : "❌"}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">{user.money} EGP</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">No users found</td>
                </tr>
              )}
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
