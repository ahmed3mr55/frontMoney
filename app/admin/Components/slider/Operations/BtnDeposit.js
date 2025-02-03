"use client";
import React from "react";
import Deposit from "../../deposit/Deposit";
import { useState } from "react";

const BtnDeposit = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };
  return (
    <div>
      <button onClick={handleOpenModal} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
        Deposit
      </button>
      {openModal && <Deposit onClose={handleCloseModal} />}
    </div>
  );
};

export default BtnDeposit;
