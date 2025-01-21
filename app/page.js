'use client';
import React from "react";
import Cookies from "js-cookie";
import Profile from "./Components/profile/Profile";
import Transfer from "./Components/transfer/Transfer";
import Transaction from "./Components/transaction/Transaction";
import Money from "./Components/money/Money";
import Visa from "./Components/visa/Visa";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Home() {
  const [balance, setBalance] = useState(null);
  const updateBalance = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBalance(data.balance || 0);
      } else {
        console.error(data.message || 'Failed to fetch balance.');
      }
    } catch (error) {
      console.error(error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    updateBalance();
  }, []);
  return (
    <div className="overflow-x-hidden">
      <div className="w-full flex justify-center items-center flex-col">
        <div className="w-full flex justify-center">
          <Transfer onTransferSuccess={updateBalance} />
        </div>
        <div className=" flex justify-center items-center lg:gap-24 md:gap-17 sm:gap-10 md:flex-row sm:flex-row  xs:flex-col xs:gap-5 ">
          <div className=" flex justify-end ">
            <Money balance={balance} />
          </div>
          <Link href="/Components/visa" className=" flex justify-start ">
            <Visa />
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col">
        <Transaction show="2" />
        <h4 className="text-center font-bold cursor-pointer p-5">See more</h4>
      </div>
    </div>
  );
}
