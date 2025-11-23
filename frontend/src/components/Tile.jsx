import { motion } from "motion/react";

const tileVariants = {
  empty: { scale: 1 },
  notEmpty: { scale: [1.5, 1], transition: { duration: 0.2 } },
};

function Tile({ bgColor = "bg-white", letter = "" }) {
  return (
    <motion.div
      className={`flex justify-center h-14 w-14 border-1 border-black items-center rounded-b-sm ${bgColor} shadow-2xl`}
      animate={letter === "" ? "empty" : "notEmpty"}
      variants={tileVariants}
    >
      <span className="text-black text-4xl font-semibold">{letter}</span>
    </motion.div>
  );
}

export default Tile;
