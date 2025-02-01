"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Check from "../Components/checkAdmin/Check";
import Deposit from "../Components/deposit/Deposit";
import Slider from "../Components/slider/Slider";

const Page = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col overflow-x-hidden">
      <Check/>
      <Slider/>
      <Deposit/>
    </div>
  )
};

export default Page;