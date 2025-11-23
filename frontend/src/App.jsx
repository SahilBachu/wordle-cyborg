import { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import wordleWords from "./assets/wordles.js";
import validWords from "./assets/validWords.js";
import axios from "axios";
let correctColor = "bg-green-500";
let halfCorrectColor = "bg-yellow-500";
let wrongColor = "bg-red-700";

const wordleWordArray = wordleWords.split(/\r?\n/);
const validWordsArray = validWords.split(/\r?\n/);
const worldeWordsSet = new Set(wordleWordArray);
const validWordsSet = new Set(validWordsArray);

function randomWordGenerator() {
  let randomNum = Math.floor(Math.random() * wordleWordArray.length);
  let randomWord = wordleWordArray[randomNum];
  if (!randomWord) {
    // Return a default word if something went wrong
    return "ERROR";
  }
  return randomWord.toUpperCase();
}

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
  let rowColors = Array(5).fill(wrongColor); // Start assuming everything is Gray
  let solutionChars = {};

  // STEP 1: Build a frequency map of the solution
  // Example: "ABBEY" -> { A:1, B:2, E:1, Y:1 }
  for (let char of solution) {
    solutionChars[char] = (solutionChars[char] || 0) + 1;
  }

  // STEP 2: Find GREENS first (Priority)
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      rowColors[i] = correctColor;
      solutionChars[guess[i]]--; // "Use up" this letter so it can't be Yellow later
    }
  }

  // STEP 3: Find YELLOWS
  for (let i = 0; i < 5; i++) {
    // Only check if we haven't already marked it Green
    if (rowColors[i] === wrongColor) {
      let letter = guess[i];

      // Do we have any of this letter left in the solution?
      if (solutionChars[letter] > 0) {
        rowColors[i] = halfCorrectColor;
        solutionChars[letter]--; // Use it up
      }
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
  const [solution, setSolution] = useState(randomWordGenerator);
  const [guesses, newGuess] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [stillNotWon, setStillNotWon] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [aiSuggestion, setAISuggestion] = useState("");
  console.log(solution);

  const generateAIText = async () => {
    setAISuggestion("");

    const dataObject = {
      guess_history: guesses,
      color_history: getColorArray(guesses, solution),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/suggest",
        dataObject
      );
      setAISuggestion(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (stillNotWon) {
      const pressedKey = event.key;
      if (isLetter(event.key) && currentGuess.length < 5) {
        const uppercaseKey = pressedKey.toUpperCase();
        setCurrentGuess((prev) => prev + uppercaseKey);
        console.log(`Key pressed: ${uppercaseKey}`);
      } else if (pressedKey == "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (pressedKey == "Enter" && currentGuess.length === 5) {
        if (isValidWord(currentGuess)) {
          newGuess((prev) => [...prev, currentGuess]);
          if (isSolution(solution, currentGuess)) {
            setStillNotWon(false);
          }
          setIsFlipping(true);
          setTimeout(() => {
            setIsFlipping(false);
          }, 500);

          setCurrentGuess("");
          console.log(`Entered Word: :${currentGuess}`);
        } else {
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 500);
        }
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
      <Board
        word_list={all_words}
        color_list={all_colors}
        shaking={isShaking}
        flipping={isFlipping}
        guesses={guesses.length}
        GenerateAiText={generateAIText}
        AIsuggestion={aiSuggestion}
      />
    </div>
  );
}

export default App;
