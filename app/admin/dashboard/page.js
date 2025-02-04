"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Check from "../Components/checkAdmin/Check";
import Deposit from "../Components/deposit/Deposit";
import Slider from "../Components/slider/Slider";
import WinDad from "../Components/slider/Operations/WinDad";
import Users from "../Components/users/Users";
import Update from "../Components/users/update/Update";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col overflow-x-hidden">
      <Check/>
      <Slider/>
      <WinDad/>
      <div className="w-full flex justify-center items-center flex-col">
        <Users show={5} />
        <Link href="/admin/Components/users" className="text-sm text-gray-600 pb-4 hover:text-gray-200">see more</Link>
      </div>
    </div>
  )
};

export default Page;