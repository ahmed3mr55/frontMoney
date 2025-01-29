"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // مكتبة أيقونات Lucide
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const currentToken = Cookies.get("token");
    setToken(currentToken);
  }, []);

  useEffect(() => {
    if (token) {
      setTokenExists(true);
      fetchUser();
    } else {
      setTokenExists(false);
      setProfile(null);
    }
  }, [token]);

  const fetchUser = async () => {
    if (!token) return;
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

  const handleLogout = () => {
    Cookies.remove("token");
    setProfile(null);
    setTokenExists(false);
    setToken(null);
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

        <div className="absolute left-0 bg-gray-700 p-4 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <Link href="/Components/profile/update" className="text-white my-1 hover:bg-slate-600 bg-slate-500 p-1 rounded w-full">
            Account
          </Link>
          <p className="text-white my-1 hover:bg-slate-600 bg-slate-500 p-1 rounded">Option2</p>
          <p className="text-white my-1 hover:bg-slate-600 bg-slate-500 p-1 rounded cursor-pointer">Settings</p>
          {profile?.isAdmin && (
            <p className="text-white cursor-pointer my-1 hover:bg-slate-600 bg-slate-500 p-1 rounded">
              Dashboard
            </p>
          )}
          <p
            onClick={handleLogout}
            className="text-white my-1 text-center hover:bg-red-600 bg-red-500 p-1 rounded cursor-pointer"
          >
            Logout
          </p>
        </div>
      </div>

      <ul className="flex gap-3 text-white items-center">
        <li className="cursor-pointer hover:underline hover:text-blue-500">
          <Link href="/">Home</Link>
        </li>
        <li className="cursor-pointer">About</li>
        
        {/* زر الوضع الداكن بتصميم انسيابي */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 shadow-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-900" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;
