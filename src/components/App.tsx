import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  //@ts-ignore
  const [randomWord, setRandomWord] = useState<string>();
  //@ts-ignore
  const [guessList, setGuessList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getRandomWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?lang=en&length=5")
      .then((res) => res.json())
      .then((wordList: { 0: string }) => setRandomWord(wordList[0]));
  };

  const handleOnKeyDown = (key: string) => {
    if (key === "Enter" && inputValue.length === 5) {
      setGuessList((prev) => {
        const newList = [...prev, inputValue];
        setInputValue("");
        return newList;
      });
    }
  };

  useEffect(getRandomWord, []);

  return (
    <div className="App">
      {randomWord}
      <input
        className="input-guess"
        maxLength={5}
        minLength={5}
        onChange={(e) => setInputValue(e.target.value.toUpperCase())}
        value={inputValue}
        onKeyDown={(e) => handleOnKeyDown(e.key)}
      />
      {guessList.map((guess, index) => (
        <p key={index}>{guess}</p>
      ))}
    </div>
  );
}
