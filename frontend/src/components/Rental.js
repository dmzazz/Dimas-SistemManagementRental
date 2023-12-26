import React from "react";
import Auth from "../auth/Auth";

const Rental = () => {
  return (
    <>
    <Auth/>
      <div className="">
        <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
          <span className="text-[#29A19C] text-xl font-bold">2</span>
          <p className="text-sm text-[#bbb] font-medium">Rental active</p>
        </div>
      </div>
    </>
  );
};

export default Rental;
