import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import PopUp from "./components/PopUp";
import { showNotification as show } from "./helpers/Helpers";
import Notification from "./components/Notification";

// const words = ["application", "programming", "interface", "wizard"];

// let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch("/words.txt");
        const wordsText = await response.text();
        const wordsArray = wordsText.split("\n");
        const easyWords = wordsArray.filter(
          (word) => word.length >= 3 && word.length,
          +5
        );
        const mediumWords = wordsArray.filter(
          (word) => word.length >= 6 && word.length,
          +8
        );
        const hardWords = wordsArray.filter((word) => word.length >= 9);

        let selectedDifficultyWords;
        const difficulty = prompt(
          "Select Difficulty: (easy, medium, hard)"
        ).toLowerCase();

        if (difficulty === "easy") {
          selectedDifficultyWords = easyWords;
        } else if (difficulty === "medium") {
          selectedDifficultyWords = mediumWords;
        } else if (difficulty === "hard") {
          selectedDifficultyWords = hardWords;
        } else {
          alert("Invalid difficulty. Defaulting to easy.");
          selectedDifficultyWords = easyWords;
        }

        const randomIndex = Math.floor(
          Math.random() * selectedDifficultyWords.length
        );
        const selectedWord = selectedDifficultyWords[randomIndex];
        setSelectedWord(selectedWord);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();

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
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-conatiner">
        <Figure wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
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
