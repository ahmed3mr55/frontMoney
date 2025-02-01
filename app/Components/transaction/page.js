"use client";
import React from 'react'
import Transaction from './Transaction'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
    const token = Cookies.get("token");
    const router = useRouter();
    useEffect(() => {
        if (!token) {
          router.push("/auth/login");
        }
    }, [token]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Transaction />
      <h4 className="text-sm text-gray-600 p-3">End of transactions</h4>
    </div>
  )
}

export default page
