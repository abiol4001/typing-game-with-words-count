import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const textRef = useRef(null);

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(5);
    setText("");
    textRef.current.disabled = false;
    textRef.current.focus();
  }

  function calculateWords() {
    var wordsArray = text.trim().split(" ");
    return wordsArray.filter((word) => word !== "").length;
  }

  useEffect(() => {
    if (isTimeRunning & (timeRemaining > 0)) {
      setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false);
      setWordCount(calculateWords());
    }
  }, [isTimeRunning, timeRemaining]);

  return (
    <div className="App">
      <h1>Typing Game</h1>
      <textarea
        ref={textRef}
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!isTimeRunning}
      />
      <h1>Time remaining: {timeRemaining}</h1>
      <button disabled={isTimeRunning} onClick={startGame}>
        Start
      </button>
      <h4>Word Count: {wordCount}</h4>
    </div>
  );
}
