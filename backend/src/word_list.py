import os

# read the .txt containing all possible answers and returns a list of them
def wordsFromFile() -> list[str]:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "wordleWords.txt")
    wordList = []
    with open(file_path, "r") as file:
        for line in file:
            wordList.append(str(line.strip()))
    return wordList

import random
import json

# 1. SETUP: Define your colors and a small list of common words
CORRECT = "bg-green-500"
PRESENT = "bg-yellow-500"
ABSENT  = "bg-red-700"

# A small subset of common words to ensure validity during testing
COMMON_WORDS = [
    "APPLE", "BEACH", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST", "CHORD",
    "CLICK", "CLOCK", "CLOUD", "DANCE", "DIARY", "DRINK", "DRIVE", "EARTH",
    "FEAST", "FIELD", "FRUIT", "GLASS", "GRAPE", "GREEN", "GHOST", "HEART",
    "HOUSE", "JUICE", "LIGHT", "LEMON", "MELON", "MONEY", "MUSIC", "NIGHT",
    "PARTY", "PIANO", "PILOT", "PLANE", "PHONE", "PLANT", "PLATE", "POWER",
    "RADIO", "RIVER", "ROBOT", "SHIRT", "SHOES", "SKIRT", "SMILE", "SNAKE",
    "SPACE", "SPOON", "STORM", "TABLE", "TIGER", "TOAST", "TOUCH", "TRAIN",
    "TRUCK", "VOICE", "WATER", "WATCH", "WHALE", "WORLD", "WRITE", "YOUTH"
]

def get_feedback_colors(guess, solution):
    """
    Calculates the exact color array for a guess against a solution.
    Handles duplicate letters correctly.
    """
    row_colors = [ABSENT] * 5
    solution_chars = {}

    # Count frequency of letters in solution
    for char in solution:
        solution_chars[char] = solution_chars.get(char, 0) + 1

    # Pass 1: Green (Correct Position)
    for i in range(5):
        if guess[i] == solution[i]:
            row_colors[i] = CORRECT
            solution_chars[guess[i]] -= 1

    # Pass 2: Yellow (Wrong Position)
    for i in range(5):
        if row_colors[i] == ABSENT: # Only check if not already Green
            char = guess[i]
            if solution_chars.get(char, 0) > 0:
                row_colors[i] = PRESENT
                solution_chars[char] -= 1
    
    return row_colors

def generate_random_state():
    # 1. Pick a random solution
    solution = random.choice(COMMON_WORDS)
    
    # 2. Decide how many turns have passed (0 to 5)
    turns_taken = random.randint(1, 5)
    
    guesses = []
    
    # 3. Generate random guesses
    # We ensure we don't accidentally pick the solution early, 
    # unless it's the very last turn we decided on.
    available_guesses = [w for w in COMMON_WORDS if w != solution]
    
    for _ in range(turns_taken):
        guess = random.choice(available_guesses)
        guesses.append(guess)
        # Remove to avoid duplicate guesses
        available_guesses.remove(guess) 

    # 4. Pad the guesses list to size 6 with empty strings
    full_guess_history = guesses[:]
    while len(full_guess_history) < 6:
        full_guess_history.append("")

    # 5. Generate the Color History (2D Array)
    color_history = []
    
    # Calculate colors for actual guesses
    for guess in guesses:
        colors = get_feedback_colors(guess, solution)
        color_history.append(colors)
        
    # Fill remaining rows with empty strings (or whatever your frontend expects for empty)
    # Usually empty rows have 5 empty strings or 5 default color strings.
    # Here we'll use empty strings ["", "", "", "", ""]
    while len(color_history) < 6:
        color_history.append(["", "", "", "", ""])

    # 6. Construct the Final Object
    data_object = {
        "solution_was": solution, # Included for your reference
        "guess_history": full_guess_history,
        "color_history": color_history
    }
    
    return data_object

# --- RUN IT ---
if __name__ == "__main__":
    # Generate 5 examples
    for i in range(5):
        print(f"--- Example {i+1} ---")
        print(json.dumps(generate_random_state()))
        print("\n")
