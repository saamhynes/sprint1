import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import PopUp from "./components/PopUp";
import { showNotification as show } from "./helpers/Helpers";
import Notification from "./components/Notification";

const words = {
  easy: [
    "apple",
    "banana",
    "carrot",
    "dog",
    "elephant",
    "flower",
    "guitar",
    "house",
    "island",
    "jungle",
  ],
  medium: [
    "computer",
    "program",
    "keyboard",
    "monitor",
    "internet",
    "database",
    "website",
    "framework",
    "library",
    "algorithm",
  ],
  hard: [
    "xylophone",
    "pneumonia",
    "rhythm",
    "juxtaposition",
    "mnemonic",
    "chiaroscuro",
    "schizophrenia",
    "accommodate",
    "czar",
    "quizzical",
  ],
};

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [selectedWord, setSelectedWord] = useState(
    words[difficulty][Math.floor(Math.random() * words[difficulty].length)]
  );
  const [difficultySelected, setDifficultySelected] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLocaleLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, selectedWord]);

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setSelectedWord(
      words[selectedDifficulty][
        Math.floor(Math.random() * words[selectedDifficulty].length)
      ]
    );
    setDifficultySelected(true);
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
  };

  const difficultyLevels = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setSelectedWord(
      words[difficulty][Math.floor(Math.random() * words[difficulty].length)]
    );
    setDifficultySelected(false);
  }

  return (
    <>
      <Header />
      <div className="game-container">
        {difficultySelected ? null : (
          <div>
            <h2>&nbsp; Select Difficulty:</h2>
            &nbsp;
            {difficultyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleDifficultySelect(level.value)}
                className={
                  (level.value === difficulty ? "selected" : "", "btn")
                }
              >
                {level.label}
              </button>
            ))}
          </div>
        )}
        <div className="word-section">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
      </div>
      <PopUp
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
