import { useState } from "react";

export default function App() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("Make your move!!!");
  const [winner, setWinner] = useState("");
  const [rounds, setRounds] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };
  const getComputerChoice=()=>{const choices = ["rock","paper","scissors"];
    return choices[Math.floor(Math.random()*3)];
  };
  const playGame=(choice)=>{const compChoice=getComputerChoice();setUserChoice(choice);setComputerChoice(compChoice);
    let gameResult = "";
    let gameWinner = "";
    if (choice===compChoice) {
      gameResult = "Draw!";
      gameWinner = "No one";
      setStreak(0);
    }else if (
      (choice==="rock" && compChoice==="scissors") ||
      (choice ==="paper" && compChoice ==="rock") ||
      (choice ==="scissors" && compChoice ==="paper")
    ) {
      gameResult = "You Win!";
      gameWinner = "You";
      setStreak((prev) => prev + 1);
    } else {
      gameResult = "Computer Wins!";
      gameWinner = "Computer";
      setStreak(0);
    }
    setResult(gameResult);
    setWinner(gameWinner);
    setRounds((prev) => prev + 1);
    setHistory((prev) => [...prev,{ user: choice, computer: compChoice, result: gameResult },]);
  };
  const resetGame = () => {
    setUserChoice("");setComputerChoice("");setResult("Make your move!");setWinner("");setRounds(0);setHistory([]);setStreak(0);setShowHistory(false);
  };
  return (
    <div>
      <h1>Computer : You</h1>
      <button onClick={() => playGame("rock")}>🪨 Rock</button>
      <button onClick={() => playGame("paper")}>📄 Paper</button>
      <button onClick={() => playGame("scissors")}>✂️ Scissors</button>
      <h1>
        {computerChoice ? emojis[computerChoice] : ""} :{" "}
        {userChoice ? emojis[userChoice] : ""}
      </h1>
      <h2>{result}</h2>
      <h3>Winner: {winner}</h3>
      <button onClick={resetGame}>Reset</button>
      <h2>Rounds Played: {rounds}</h2>
      <h2>🔥 Win Streak: {streak}</h2>
      <button onClick={() => setShowHistory((prev)=>!prev)}>{showHistory?"Hide History":"Show History"}
      </button>
      {showHistory && (
        <div style={{ marginTop: "10px" }}>
          <h3>Move History:</h3>
          {history.length === 0 ? (
            <p>No rounds played yet</p>
          ) : (
            history.map((move, num) => (
              <p key={num}>
                Round {num + 1}: {emojis[move.computer]} :{" "}
                {emojis[move.user]} → {move.result}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}