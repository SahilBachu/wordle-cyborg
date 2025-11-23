import React, { useState } from "react";
import cyborg_filled from "../assets/cyborg-filled.png";
import cyborg_unfilled from "../assets/cyborg-unfilled.png";

const CyborgToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  let image_src = isChecked ? cyborg_filled : cyborg_unfilled;

  return (
    <div className="flex-col space-y-1">
      <img
        className="h-auto max-w-full ml-1"
        src={image_src}
        alt="cyborg image"
      ></img>
      <label className="flex cursor-pointer select-none items-center ml-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-red-700" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition ${
              isChecked ? "translate-x-full bg-gray-50" : "bg-black"
            }`}
          ></div>
        </div>
      </label>
      <p
        className={`text-base text-heading font-medium ${
          isChecked ? "text-red-700" : "text-black"
        }`}
      >
        CyberMode
      </p>
    </div>
  );
};

export default CyborgToggle;
