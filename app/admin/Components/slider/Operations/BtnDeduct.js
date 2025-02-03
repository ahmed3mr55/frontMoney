"use client";
import React from "react";
import Deduct from "../../deduct/Deduct";
import { useState } from "react";

const BtnDeduct = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    }

    const handleCloseModal = () => {
      setOpenModal(false);
    }
  return (
    <div>
      <button onClick={handleOpenModal} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
        deduct
      </button>
      {openModal && <Deduct onClose={handleCloseModal} />}
    </div>
  );
};

export default BtnDeduct;
