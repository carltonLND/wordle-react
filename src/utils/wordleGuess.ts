type Mark = "correct" | "found" | "wrong";

export interface MarkedGuess {
  guessWord: string;
  marks: Mark[];
}

interface LetterOccurences {
  [letter: string]: number;
}

export function markWordleGuess(
  guess: string,
  hiddenTarget: string
): MarkedGuess {
  const markedWord = { guessWord: guess };

  if (guess === hiddenTarget) {
    return {
      ...markedWord,
      marks: ["correct", "correct", "correct", "correct", "correct"],
    };
  }

  const targetOccurences = countOccurences(hiddenTarget);
  const marks: Mark[] = [];

  guess.split("").forEach((letter, index) => {
    const mark = isCorrectLetter(letter, index, hiddenTarget);
    marks.push(mark);

    if (mark === "correct") {
      targetOccurences[letter]--;
    }
  });

  marks.forEach((mark, index) => {
    const letter = guess[index];
    if (mark === "wrong" && targetOccurences[letter] !== 0) {
      const newMark = isFoundLetter(guess[index], hiddenTarget);
      if (newMark === "found") {
        marks.splice(index, 1, newMark);
        targetOccurences[letter]--;
      }
    }
  });

  return {
    ...markedWord,
    marks,
  };
}

export function isWin(markedGuess: MarkedGuess): boolean {
  return markedGuess.marks.every((mark) => mark === "correct");
}

function isFoundLetter(letter: string, target: string): Mark {
  for (let i = 0; i < target.length; i++) {
    if (letter === target[i]) {
      return "found";
    }
  }

  return "wrong";
}

function isCorrectLetter(letter: string, index: number, target: string): Mark {
  for (let i = 0; i < target.length; i++) {
    if (letter === target[i] && index === i) {
      return "correct";
    }
  }

  return "wrong";
}

function countOccurences(word: string): LetterOccurences {
  const result: LetterOccurences = {};
  for (const letter of word) {
    if (!(letter in result)) {
      result[letter] = 0;
    }

    result[letter]++;
  }

  return result;
}
