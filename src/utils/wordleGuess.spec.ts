import { markWordleGuess } from "./wordleGuess";

test("Testing if guess has excess duplicate letters", () => {
  const target = "LEVEL";
  const guess1 = "LULLS";

  expect(markWordleGuess(guess1, target)).toStrictEqual({
    guessWord: guess1,
    marks: ["correct", "wrong", "found", "wrong", "wrong"],
  });
});

test("Testing for duplicate correct letters", () => {
  const target = "LEVEL";
  const guess2 = "STEEL";

  expect(markWordleGuess(guess2, target)).toStrictEqual({
    guessWord: guess2,
    marks: ["wrong", "wrong", "found", "correct", "correct"],
  });
});

test("Testing for winning guess", () => {
  const target = "LEVEL";
  const guess3 = "LEVEL";

  expect(markWordleGuess(guess3, target)).toStrictEqual({
    guessWord: guess3,
    marks: ["correct", "correct", "correct", "correct", "correct"],
  });
});

test("Test all the things", () => {
  const target = "PARTY";
  const guess = "APPLE";

  expect(markWordleGuess(guess, target)).toStrictEqual({
    guessWord: guess,
    marks: ["found", "found", "wrong", "wrong", "wrong"],
  });
});
