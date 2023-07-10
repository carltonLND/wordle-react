import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [randomWord, setRandomWord] = useState<string>();
  // State keeping track of each guess, compute "mark" each render

  const getRandomWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?lang=en&length=5")
      .then((res) => res.json())
      .then((wordList: { 0: string }) => setRandomWord(wordList[0]));
  };

  useEffect(getRandomWord, []);

  return <div className="App">{randomWord}</div>;
}
