import { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import wordleWords from "./assets/wordles.js";
import validWords from "./assets/validWords.js";
let correctColor = "bg-green-500";
let halfCorrectColor = "bg-yellow-500";
let wrongColor = "bg-red-700";

const worldeWordsSet = new Set(wordleWords.split(/\r?\n/));
const validWordsSet = new Set(validWords.split(/\r?\n/));

function isValidWord(word) {
  const wordLower = word.toLowerCase();
  const isPresent =
    validWordsSet.has(wordLower) || worldeWordsSet.has(wordLower);
  console.log(isPresent);
  return isPresent;
}

function isLetter(char) {
  return char.length === 1 && char.match(/[a-z]/i);
}

function constructWordArray(word_list, current) {
  let output = [...word_list];
  let live = current;

  if (word_list.length < 6) {
    for (let i = 0; i < 5 - live.length; i++) {
      live = live + "";
    }
    output.push(live);
  }
  while (output.length < 6) {
    output.push("");
  }
  return output;
}

function getColorArray(full_word_list, solution) {
  let output = [];
  for (let word of full_word_list) {
    output.push(getColors(word, solution));
  }
  while (output.length < 6) {
    output.push(Array(5).fill(""));
  }
  return output;
}

function getColors(guess, solution) {
  let rowColors = [];

  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      rowColors.push(correctColor);
    } else if (solution.includes(guess[i])) {
      rowColors.push(halfCorrectColor);
    } else {
      rowColors.push(wrongColor);
    }
  }
  return rowColors;
}

function isSolution(word, sol) {
  if (word === sol) {
    return true;
  } else {
    return false;
  }
}

function App() {
  const [solution, setSolution] = useState("GLOBE");
  const [guesses, newGuess] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [stillNotWon, setStillNotWon] = useState(true);

  console.log(validWordsSet);

  const handleKeyDown = (event) => {
    if (stillNotWon) {
      const pressedKey = event.key;
      if (isLetter(event.key) && currentGuess.length < 5) {
        const uppercaseKey = pressedKey.toUpperCase();
        setCurrentGuess((prev) => prev + uppercaseKey);
        console.log(`Key pressed: ${uppercaseKey}`);
      } else if (pressedKey == "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (
        pressedKey == "Enter" &&
        currentGuess.length === 5 &&
        isValidWord(currentGuess)
      ) {
        newGuess((prev) => [...prev, currentGuess]);
        if (isSolution(solution, currentGuess)) {
          setStillNotWon(false);
        }
        setCurrentGuess("");
        console.log(`Entered Word: :${currentGuess}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess]);

  let all_words = constructWordArray(guesses, currentGuess);
  let all_colors = getColorArray(guesses, solution);
  console.log(all_colors);

  return (
    <div>
      <Header />
      <Board word_list={all_words} color_list={all_colors} />
    </div>
  );
}

export default App;
