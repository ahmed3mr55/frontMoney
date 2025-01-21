"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);  // إضافة حالة لتخزين التوكن

  const fetchUser = async () => {
    if (!token) return; // إذا لم يوجد توكن، لا يتم تنفيذ العملية
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentToken = Cookies.get("token");
    setToken(currentToken);  // تحديث حالة التوكن
  }, []);

  useEffect(() => {
    if (token) {
      setTokenExists(true);
      fetchUser();
    } else {
      setTokenExists(false);
      setProfile(null); // إذا لم يوجد توكن، تأكد من إعادة تعيين الملف الشخصي
    }
  }, [token]);  // مراقبة التغيير في التوكن

  const handleLogout = () => {
    Cookies.remove("token");
    setProfile(null);
    setTokenExists(false);
    setToken(null);  // إعادة تعيين التوكن
    router.push("/auth/login");
  };

  if (!tokenExists) return null;

  return (
    <nav className="bg-gray-800 fixed top-0 w-full left-0 flex justify-between items-center p-4 z-50">
      <div className="relative group">
        <h2 className="text-white cursor-pointer flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {profile?.firstName?.charAt(0) || "U"}
          </div>
          <div>
            {profile?.firstName + " " || "User"}
            <p className="text-xs text-green-500">
              {profile?.money?.toLocaleString() || 0} EGP
            </p>
          </div>
        </h2>

        <div className="absolute left-0 bg-gray-700 p-4 rounded-md  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <p className="text-white text-sm mb-1">MyAccount</p>
          <p className="text-white mb-1">Option2</p>
          <p className="text-white mb-1">Option3</p>
          {profile?.isAdmin === true && (
            <p className="text-white cursor-pointer mb-1 bg-green-500 p-1 rounded">
              Dashboard
            </p>
          )}
          <p
            onClick={handleLogout}
            className="text-white mb-1 text-center bg-red-500 p-1 rounded cursor-pointer"
          >
            Logout
          </p>
        </div>
      </div>

      <ul className="flex gap-3 text-white">
        <li className="cursor-pointer hover:underline hover:text-blue-500"><Link href="/">Home</Link></li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default NavBar;
