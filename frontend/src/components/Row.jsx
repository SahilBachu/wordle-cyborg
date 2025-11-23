import Tile from "./Tile";
import { motion } from "motion/react";

const rowVariants = {
  normal: { scale: 1 },
  flip: {
    scale: [1.5, 1],
    rotateX: [-90, 0, 90, 0],
    transition: { duration: 0.5 },
  },
};

const Row = ({
  word = "",
  cols = ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
  flip = false,
}) => {
  let letter1 = word[0];
  let letter2 = word[1];
  let letter3 = word[2];
  let letter4 = word[3];
  let letter5 = word[4];

  return (
    <motion.div
      className="flex space-x-4"
      variants={rowVariants}
      animate={flip ? "flip" : "normal"}
    >
      <div>
        <Tile letter={letter1} bgColor={cols[0]} />
      </div>
      <div>
        <Tile letter={letter2} bgColor={cols[1]} />
      </div>
      <div>
        <Tile letter={letter3} bgColor={cols[2]} />
      </div>
      <div>
        <Tile letter={letter4} bgColor={cols[3]} />
      </div>
      <div>
        <Tile letter={letter5} bgColor={cols[4]} />
      </div>
    </motion.div>
  );
};

export default Row;
