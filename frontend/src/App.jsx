// Main app component for the Wordle

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import wordleWords from "./assets/wordles.js";
import validWords from "./assets/validWords.js";
import axios from "axios"; //for API request
import { motion } from "motion/react";
//predefining the colors
let correctColor = "bg-green-500";
let halfCorrectColor = "bg-yellow-500";
let wrongColor = "bg-red-600";

//constructing array and set from txt files for answers and valid words
const wordleWordArray = wordleWords.split(/\r?\n/);
const validWordsArray = validWords.split(/\r?\n/);
const worldeWordsSet = new Set(wordleWordArray);
const validWordsSet = new Set(validWordsArray);

//variants for animation for the cyborgToggle
const cyborgVariants = {
  notCyborg: { backgroundColor: "#FFFFFF" },
  cyborg: { backgroundColor: "#B91C1C", transition: { duration: 2 } },
};

//generates a random word for the solution
function randomWordGenerator() {
  let randomNum = Math.floor(Math.random() * wordleWordArray.length);
  let randomWord = wordleWordArray[randomNum];
  if (!randomWord) {
    // Return a default word if something went wrong
    return "ERROR";
  }
  return randomWord.toUpperCase();
}

//checking if a given word can be found in the validWord set
function isValidWord(word) {
  const wordLower = word.toLowerCase();
  const isPresent =
    validWordsSet.has(wordLower) || worldeWordsSet.has(wordLower);

  return isPresent;
}

//checking if a character is a letter for input
function isLetter(char) {
  return char.length === 1 && char.match(/[a-z]/i);
}

//To pass to the board component, this constucts a list of words based on the existing words entered
function constructWordArray(word_list, current) {
  //push the existing word
  let output = [...word_list];
  let live = current;

  //if a word is not fully typed yet, fill the rest with ""
  if (word_list.length < 6) {
    for (let i = 0; i < 5 - live.length; i++) {
      live = live + "";
    }
    output.push(live);
  }
  //remaining empty words
  while (output.length < 6) {
    output.push("");
  }
  return output;
}

//compares the word list to the solution and decides what colors to assign using helper function
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

//helper function for getColorArray that compares a guess with the solution
function getColors(guess, solution) {
  let rowColors = Array(5).fill(wrongColor); // Start assuming everything is Gray
  let solutionChars = {};

  // STEP 1: Build a frequency map of the solution
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

//checks if a word is the solution
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
  const [cyberMode, setCyberMode] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const toggleCyberMode = () => {
    setCyberMode(!cyberMode);
  };

  //API function to create JSON and get response from flask
  const generateAIText = async () => {
    setAISuggestion("");
    setIsThinking(true);

    //create object based on current history, axios converts it to JSON automatically
    const dataObject = {
      guess_history: guesses,
      color_history: getColorArray(guesses, solution),
    };

    try {
      //API fetch
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/suggest`,
        dataObject
      );
      //set the suggestion to the received word and re-render
      setAISuggestion(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsThinking(false);
    }
  };
  // if any key is pressed
  const handleKeyDown = (event) => {
    //only if the game is not over
    if (stillNotWon) {
      const pressedKey = event.key;
      //if its a letter
      if (isLetter(event.key) && currentGuess.length < 5) {
        const uppercaseKey = pressedKey.toUpperCase();
        //change the current guess and re-render screen
        setCurrentGuess((prev) => prev + uppercaseKey);
        //if its a backspace
      } else if (pressedKey == "Backspace") {
        //remove the last letter from guess
        setCurrentGuess((prev) => prev.slice(0, -1));
        //if enter is hit and 5 letters inputted
      } else if (pressedKey == "Enter" && currentGuess.length === 5) {
        //if its a valid word
        if (isValidWord(currentGuess)) {
          //add to guesses list
          newGuess((prev) => [...prev, currentGuess]);
          //if its the solution, end the game
          if (isSolution(solution, currentGuess)) {
            setStillNotWon(false);
          }
          //flip animation
          setIsFlipping(true);
          setTimeout(() => {
            setIsFlipping(false);
          }, 500);

          setCurrentGuess("");
          //if its not a valid word then shake error
        } else {
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 500);
        }
      }
    }
  };
  //keydown effect handler
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess]);

  //using functions to generate lists to pass to child components
  let all_words = constructWordArray(guesses, currentGuess);
  let all_colors = getColorArray(guesses, solution);

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <Header cyberModeBool={cyberMode} />
      <motion.div
        className="min-h-screen"
        animate={cyberMode ? "cyborg" : "notCyborg"}
        variants={cyborgVariants}
      >
        <Board
          word_list={all_words}
          color_list={all_colors}
          shaking={isShaking}
          flipping={isFlipping}
          guesses={guesses.length}
          GenerateAiText={generateAIText}
          AIsuggestion={aiSuggestion}
          cyberModeFunc={toggleCyberMode}
          cyborgMode={cyberMode}
          thinking={isThinking}
        />
      </motion.div>
    </div>
  );
}

export default App;
