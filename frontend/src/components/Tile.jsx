function Tile({ bgColor = "bg-white", letter = "" }) {
  return (
    <div
      className={`flex justify-center h-14 w-14 border-2 border-black items-center rounded-b-sm ${bgColor}`}
    >
      <span className="text-black text-4xl font-semibold">{letter}</span>
    </div>
  );
}

export default Tile;
