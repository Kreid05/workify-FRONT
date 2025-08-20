import Lottie from "lottie-react";
import React, { useState } from "react";
import coding from "../../../assets/Coding.json";

const Inquiries = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-64 h-64">
        <Lottie animationData={coding} loop={true} />
      </div>
      <p className="mt-4 text-lg text-black-700">This page is under development</p>
    </div>
  );
};

export default Inquiries;