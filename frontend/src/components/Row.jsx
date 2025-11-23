import Tile from "./Tile";

const Row = ({
  word = "HEART",
  cols = ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
}) => {
  let letter1 = word[0];
  let letter2 = word[1];
  let letter3 = word[2];
  let letter4 = word[3];
  let letter5 = word[4];

  return (
    <div className="flex space-x-4">
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
    </div>
  );
};

export default Row;
