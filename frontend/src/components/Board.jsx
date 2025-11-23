import CyborgToggle from "./CyborgToggle";
import { motion } from "motion/react";
import Row from "./Row";

const boardVariants = {
  normal: { scale: 1 },
  shake: {
    x: [0, 10, 0, -10, 0, 10, 0, -10, 0],
    transition: { duration: 0.5 },
  },
};

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
}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex space-x-20">
        <div className="invisible">
          <CyborgToggle />
        </div>

        <motion.div
          className="flex-col space-y-4"
          animate={shaking ? "shake" : "normal"}
          variants={boardVariants}
          initial={{ scale: [0.5, 1] }}
        >
          {word_list.map((item, index) => (
            <div>
              <Row
                word={item}
                cols={color_list[index]}
                flip={flipping ? (guesses - 1 === index ? true : false) : false}
              />
            </div>
          ))}
        </motion.div>
        <CyborgToggle
          generateAiText={GenerateAiText}
          textToDisplay={AIsuggestion}
        />
      </div>
    </div>
  );
};

export default Board;
