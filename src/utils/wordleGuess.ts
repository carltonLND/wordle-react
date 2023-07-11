type Mark = "correct" | "found" | "wrong";

interface MarkedGuess {
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
    if (targetOccurences[letter] === 0) {
      marks.push("wrong");
    } else {
      marks.push(getMark(letter, index, hiddenTarget));
      targetOccurences[letter]--;
    }
  });

  return {
    ...markedWord,
    marks,
  };
}

function getMark(letter: string, index: number, target: string): Mark {
  let result: Mark = "wrong";

  for (let i = 0; i < target.length; i++) {
    if (letter === target[i] && index === i) {
      return "correct";
    }

    if (letter === target[i]) {
      result = "found";
    }
  }

  return result;
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
