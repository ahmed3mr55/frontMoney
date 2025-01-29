"use client";
import React from "react";

const Money = ({ balance }) => {
  return (
    <div className=" w-full max-w-md  bg-purple-600  rounded-lg shadow-xl p-14 text-white dark:bg-slate-800 ">
      <h3 className="text-xl font-semibold mb-2">Current Balance</h3>
      <h3 className="text-2xl font-bold mt-2">
        EGP{" "}
        <span className="font-bold">
          {balance !== null ? balance.toLocaleString() : "Loading..."}
        </span>
      </h3>
    </div>
  );
};

export default Money;
