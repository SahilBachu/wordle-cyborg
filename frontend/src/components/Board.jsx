import CyborgToggle from "./CyborgToggle";
import Row from "./Row";

const Board = ({
  word_list = ["HEART", "HEART", "HEART", "HEART", "HEART"],
  color_list = [
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white"],
  ],
}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex space-x-20">
        <div className="invisible">
          <CyborgToggle />
        </div>

        <div className="flex-col space-y-4">
          <div>
            <Row word={word_list[0]} cols={color_list[0]} />
          </div>
          <div>
            <Row word={word_list[1]} cols={color_list[1]} />
          </div>
          <div>
            <Row word={word_list[2]} cols={color_list[2]} />
          </div>
          <div>
            <Row word={word_list[3]} cols={color_list[3]} />
          </div>
          <div>
            <Row word={word_list[4]} cols={color_list[4]} />
          </div>
          <div>
            <Row word={word_list[5]} cols={color_list[5]} />
          </div>
        </div>
        <CyborgToggle />
      </div>
    </div>
  );
};

export default Board;
