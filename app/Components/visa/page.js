import React from "react";
import Visa from "./Visa";
import DeleteBtn from "./DeleteBtn";
import Transactions from "./transactions/Transactions";
import ActiveBtn from "./ActiveBtn";
import PayWithVisa from "./PayWithVisa";


const page = async () => {
  return (
    <div className="w-full pt-3">
      <Visa />
      <div className="w-full flex justify-center items-center">
        <div className="mr-3">
          <DeleteBtn />
        </div>
        <div className="mr-3">
          <ActiveBtn />
        </div>
        <div>
          <PayWithVisa />
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Transactions />
      </div>
    </div>
  );
};

export default page;
