// React component for all the Cyber UI

import React, { useState } from "react";
import cyborg_filled from "../assets/cyborg-filled.png";
import cyborg_unfilled from "../assets/cyborg-unfilled.png";
import { motion } from "motion/react";

const CyborgToggle = ({ textToDisplay = "Loading...", generateAiText }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showText, setShowText] = useState(false);

  // change isChecked when the CyberToggle is flipped
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Set the text of the paragraph when AI generates it
  const handleTextChange = () => {
    setShowText(true);
    generateAiText();
  };

  //if checked then the image fills out
  let image_src = isChecked ? cyborg_filled : cyborg_unfilled;

  return (
    // full cyborg div
    <div className="flex-col space-y-1">
      {/* Cyborg image */}
      <img
        className="h-auto max-w-full ml-1"
        src={image_src}
        alt="cyborg image"
      ></img>
      {/* the CyborgSlider */}
      <label className="flex cursor-pointer select-none items-center ml-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          {/* background of the slider */}
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-red-700" : "bg-gray-200"
            }`}
          ></div>
          {/* the slider that moves */}
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition ${
              isChecked ? "translate-x-full bg-gray-50" : "bg-black"
            }`}
          ></div>
        </div>
      </label>
      {/* 'CyberMode' text display */}
      <p
        className={`text-base text-heading font-medium pr-10 ${
          isChecked ? "text-red-700" : "text-black"
        }`}
      >
        CyberMode
      </p>
      {/* if checked, show the Generate button */}
      {isChecked && (
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="h-5 w-30 rounded bg-red-700 justify-center flex items-center"
          onClick={handleTextChange}
        >
          <p className="justify-center text-white font-serif text-sm whitespace-nowrap overflow-hidden text-ellipsis select-none">
            Click to generate
          </p>
        </motion.div>
      )}
      {/* If generate button is clicked, show the text from AI */}
      {showText && (
        <p className="justify-center text-black font-serif text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {textToDisplay}
        </p>
      )}
    </div>
  );
};

export default CyborgToggle;
