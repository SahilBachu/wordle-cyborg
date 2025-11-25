// React component for the individual tile

import { motion } from "motion/react";

//constants for tile animation when a key is pressed
const tileVariants = {
  empty: { scale: 1 },
  notEmpty: { scale: [1.5, 1], transition: { duration: 0.2 } },
};

function Tile({ bgColor = "bg-white", letter = "", cyborgMode }) {
  let borderColor = "border-black";
  if (cyborgMode) {
    borderColor = "border-white";
  }

  return (
    // the tile itself
    <motion.div
      className={`flex justify-center h-12 w-12 md:h-14 md:w-14 border ${borderColor} items-center rounded-b-sm ${bgColor} shadow-2xl`}
      animate={letter === "" ? "empty" : "notEmpty"}
      variants={tileVariants}
    >
      {/* the letter inside the tile */}
      <span className="text-black text-2xl md:text-4xl font-semibold">
        {letter}
      </span>
    </motion.div>
  );
}

export default Tile;
