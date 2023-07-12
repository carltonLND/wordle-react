import "./App.css";
import { useEffect, useState } from "react";
import { markWordleGuess, isWin, MarkedGuess } from "../utils/wordleGuess";

export default function App() {
  const [randomWord, setRandomWord] = useState<string>("");
  const [guessList, setGuessList] = useState<MarkedGuess[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getRandomWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?lang=en&length=5")
      .then((res) => res.json())
      .then((wordList: { 0: string }) =>
        setRandomWord(wordList[0].toUpperCase())
      );
  };

  const handleOnKeyDown = (key: string) => {
    if (key === "Enter" && inputValue.length === 5) {
      setGuessList((prev) => {
        const markedGuess = markWordleGuess(inputValue, randomWord);
        const newList = [...prev, markedGuess];

        if (isWin(markedGuess)) {
          alert("YOU WIN!!!");
          getRandomWord();
          setInputValue("");
          return [];
        }

        if (guessList.length === 5) {
          alert(`YOU LOSE | The word was: ${randomWord}`);
          getRandomWord();
          setInputValue("");
          return [];
        }

        setInputValue("");
        return newList;
      });
    }
  };

  useEffect(getRandomWord, []);

  return (
    <div className="App">
      <h1 className="game-title">Wordle!</h1>
      <div className="game-container">
        <input
          className="input-guess"
          maxLength={5}
          minLength={5}
          onChange={(e) =>
            setInputValue(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
          }
          value={inputValue}
          onKeyDown={(e) => handleOnKeyDown(e.key)}
        />
        {guessList.map((guess, index) => (
          <div key={index} className="guess-grid">
            <Guess guess={guess} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Guess({ guess }: { guess: MarkedGuess }): JSX.Element {
  return (
    <>
      {guess.marks.map((mark, index) => {
        return (
          <div key={index} className={`guess-letter guess-${mark}`}>
            {guess.guessWord[index]}
          </div>
        );
      })}
    </>
  );
}
