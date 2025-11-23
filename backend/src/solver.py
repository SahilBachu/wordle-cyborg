import word_list
import math

def entropyStarter():
    entropySolver(word_list.generate_random_state())


def entropySolver(jsonObject):
    #read JSON from frontend
    guess_history = jsonObject['guess_history']

    while len(guess_history) < 6:
        guess_history.append("")
    color_history=jsonObject['color_history']
    #get list of possible wordle answers from local .txt
    raw_words = word_list.wordsFromFile()
    list_of_words = [w.strip().upper() for w in raw_words]

    #converting colors to G, Y, and X for easier solving
    full_color_history = []
    for i in range(0, 6):
        symbols =""
        for j in range(0, 5):
            color = color_history[i][j]
            if color == "bg-red-700":
                symbols+="X"
            elif color == "bg-yellow-500":
                symbols+="Y"
            elif color == "bg-green-500":
                symbols+="G"
            else:
                symbols+=""
        full_color_history.append(symbols)
        symbols=""

    #debugging
    print(full_color_history)
    print(guess_history)

    #if no guess has been done so far, the best word to start with is SALET
    if guess_history==['', '', '', '', '', '']:
        return "SALET"

    #debugging
    #print(f'solution expected:{jsonObject['solution_was']} ')


    candidates = []
    for possible_solution in list_of_words:
        
        isASolution = True
        for i in range(6):
            guess=guess_history[i]
            if not guess=="":
                if not getColors(guess, possible_solution)==full_color_history[i]:
                    isASolution=False
        if (isASolution):
            candidates.append(possible_solution)

    
    print(candidates)
    if(len(candidates)<3):
        print(f"FOund less candidates {candidates}")
        return str(candidates)
    else:
        wordAndEntropyDict = {}
        maxEntropy = 0
        for word in list_of_words:
            patternDict = {}
            shannon_entropy=0
            for assumed_solution in candidates:
                color_pattern = getColors(word, assumed_solution)
                if color_pattern in patternDict:
                    patternDict[color_pattern]+=1
                else:
                    patternDict[color_pattern]=1
            for value in patternDict.values():
                probability = value/len(candidates)
                shannon_entropy+= probability*math.log((1/probability), 2)
            if(shannon_entropy>maxEntropy):
                maxEntropy=shannon_entropy
            if(word not in wordAndEntropyDict):
                wordAndEntropyDict[shannon_entropy] = word

        print(wordAndEntropyDict[maxEntropy])
        return wordAndEntropyDict[maxEntropy]

  
def getColors(guess, solution):
    rowColors = ["X" for _ in range(5)]
    solutionChars = {}

    # 1. Build Frequency Map
    for char in solution:
        if char not in solutionChars:
            solutionChars[char] = 1
        else:
            solutionChars[char] += 1

    # 2. Pass 1: GREENS
    for i in range(5):
        if guess[i] == solution[i]:
            rowColors[i] = "G"
            solutionChars[guess[i]] -= 1

    # 3. Pass 2: YELLOWS
    for i in range(5):
        if rowColors[i] == "X": 
            letter = guess[i]
            if solutionChars.get(letter, 0) > 0:
                rowColors[i] = "Y"
                solutionChars[letter] -= 1
    return "".join(rowColors)
      
    
    
if __name__=='__main__':
    entropyStarter()

