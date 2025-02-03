"use client";
import React from "react";
import BtnDeposit from "./BtnDeposit";
import BtnDeduct from "./BtnDeduct";

const WinDad = () => {
  return (
    <div className=" flex justify-center items-center flex-col dark:bg-gray-800 bg-purple-600 p-11 rounded-2xl shadow-lg">
      <h2 className="lg:text-3xl md:text-2xl font-bold text-white mb-4 sm:text-lg">
        Deposit and debit
      </h2>
      <div className="flex gap-4">
        <BtnDeposit />
        <BtnDeduct />
      </div>
    </div>
  );
};

export default WinDad;
