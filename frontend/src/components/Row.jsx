// React component for each row in the wordle grid

import Tile from "./Tile";
import { motion } from "motion/react";

// constants to set the row animation when word is revealed
const rowVariants = {
  normal: { scale: 1 },
  flip: {
    scale: [1.5, 1],
    rotateX: [-90, 0, 90, 0],
    transition: { duration: 0.5 },
  },
};

//word is the word to fill in
//cols is the colors of each tile
//flip decides whether the animation happens or not
const Row = ({
  word = "",
  cols = ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
  flip = false,
  cyborgmode,
}) => {
  return (
    // this is the row
    <motion.div
      className="flex space-x-1.5 md:space-x-4"
      variants={rowVariants}
      animate={flip ? "flip" : "normal"}
    >
      {/* each tile */}
      <div>
        <Tile letter={word[0]} bgColor={cols[0]} cyborgMode={cyborgmode} />
      </div>
      <div>
        <Tile letter={word[1]} bgColor={cols[1]} cyborgMode={cyborgmode} />
      </div>
      <div>
        <Tile letter={word[2]} bgColor={cols[2]} cyborgMode={cyborgmode} />
      </div>
      <div>
        <Tile letter={word[3]} bgColor={cols[3]} cyborgMode={cyborgmode} />
      </div>
      <div>
        <Tile letter={word[4]} bgColor={cols[4]} cyborgMode={cyborgmode} />
      </div>
    </motion.div>
  );
};

export default Row;
