// React component for the entire Board Grid

import CyborgToggle from "./CyborgToggle";
import { motion } from "motion/react";
import Row from "./Row";

//constants for shake animation when answer is invalid
const boardVariants = {
  normal: { scale: 1 },
  shake: {
    x: [0, 10, 0, -10, 0, 10, 0, -10, 0],
    transition: { duration: 0.5 },
  },
};

//Board component that takes in the word_list and color_list to fill the board
//shaking, guesses and flipping for the animations
//generateAiText for the AI function and AIsuggestion for its response

const Board = ({
  word_list = ["", "", "", "", ""],
  color_list = [
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
  ],
  shaking = false,
  flipping = false,
  guesses = 0,
  GenerateAiText,
  AIsuggestion,
  cyberModeFunc,
  cyborgMode,
}) => {
  return (
    // Board and CyborgControls
    <div className="min-h-screen flex justify-center items-center pt-24 md:pt-0 pb-10 md:pb-0">
      {/* Invisibile cyborg for center alignment */}
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-20">
        <div className="invisible hidden md:block">
          <CyborgToggle />
        </div>
        {/* Contains each row element */}
        <motion.div
          className="flex-col space-y-2 md:space-y-4"
          animate={shaking ? "shake" : "normal"}
          variants={boardVariants}
          initial={{ scale: [0.5, 1] }}
        >
          {/* map each word to a row */}
          {word_list.map((item, index) => (
            <div>
              <Row
                word={item}
                // use index to map the color too
                cols={color_list[index]}
                flip={flipping ? (guesses - 1 === index ? true : false) : false}
                cyborgmode={cyborgMode}
              />
            </div>
          ))}
        </motion.div>
        {/* Cyborg toggle with neccesary text and function */}
        <CyborgToggle
          generateAiText={GenerateAiText}
          textToDisplay={AIsuggestion}
          cyberModefunc={cyberModeFunc}
        />
      </div>
    </div>
  );
};

export default Board;
