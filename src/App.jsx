import { useState } from "react";
import "./App.css";

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

  const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
  };

  const playGame = (choice) => {
    const compChoice = getComputerChoice();
    setUserChoice(choice);
    setComputerChoice(compChoice);

    let gameResult = "";
    let gameWinner = "";

    if (choice === compChoice) {
      gameResult = "Draw!";
      gameWinner = "No one";
      setStreak(0);
    } else if (
      (choice === "rock"     && compChoice === "scissors") ||
      (choice === "paper"    && compChoice === "rock") ||
      (choice === "scissors" && compChoice === "paper")
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
    setHistory((prev) => [
      ...prev,
      { user: choice, computer: compChoice, result: gameResult },
    ]);
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("Make your move!");
    setWinner("");
    setRounds(0);
    setHistory([]);
    setStreak(0);
    setShowHistory(false);
  };

  /* ── helpers for dynamic class names ── */
  const getResultClass = () => {
    if (result.includes("Win!") && !result.includes("Computer")) return "win";
    if (result.includes("Computer")) return "lose";
    if (result.includes("Draw")) return "draw";
    return "idle";
  };

  const getHistoryResultClass = (res) => {
    if (res.includes("You Win")) return "win";
    if (res.includes("Computer")) return "lose";
    return "draw";
  };

  const resultClass = getResultClass();

  return (
    <div className="game-card">

      {/* ── Header ── */}
      <div className="game-header">
        <h1 className="game-title">Rock Paper Scissors</h1>
        <p className="game-subtitle">Challenge the machine</p>
      </div>

      {/* ── Choice Buttons ── */}
      <div className="choice-section">
        {["rock", "paper", "scissors"].map((choice) => (
          <button
            key={choice}
            className={`choice-btn choice-btn-${choice}`}
            onClick={() => playGame(choice)}
          >
            <span className="choice-btn-emoji">{emojis[choice]}</span>
            <span className="choice-btn-label">{choice}</span>
          </button>
        ))}
      </div>

      {/* ── Versus Display ── */}
      <div className="versus-section">
        <div className="versus-player">
          <span className="versus-label">Computer</span>
          <span className="versus-emoji">
            {computerChoice ? emojis[computerChoice] : <span className="versus-empty">❓</span>}
          </span>
        </div>
        <div className="versus-divider">VS</div>
        <div className="versus-player">
          <span className="versus-label">You</span>
          <span className="versus-emoji">
            {userChoice ? emojis[userChoice] : <span className="versus-empty">❓</span>}
          </span>
        </div>
      </div>

      {/* ── Result ── */}
      <div className={`result-section ${resultClass}`}>
        <p className={`result-text ${resultClass}`}>{result}</p>
        {winner && (
          <p className="winner-text">
            Winner: <span>{winner}</span>
          </p>
        )}
      </div>

      {/* ── Stats ── */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{rounds}</div>
          <div className="stat-label">Rounds</div>
        </div>
        <div className="stat-card">
          <div className={`stat-value ${streak > 0 ? "streak-active" : ""}`}>
            {streak > 0 ? `🔥 ${streak}` : streak}
          </div>
          <div className="stat-label">Win Streak</div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="actions-section">
        <button className="action-btn action-btn-reset" onClick={resetGame}>
          ↺ Reset Game
        </button>
        <button
          className="action-btn action-btn-history"
          onClick={() => setShowHistory((prev) => !prev)}
        >
          {showHistory ? "✕ Hide History" : "📜 Show History"}
        </button>
      </div>

      {/* ── History ── */}
      {showHistory && (
        <div className="history-section">
          <div className="history-header">Move History</div>
          <div className="history-list">
            {history.length === 0 ? (
              <p className="history-empty">No rounds played yet</p>
            ) : (
              history.map((move, num) => (
                <div key={num} className="history-row">
                  <span className="history-round">Round {num + 1}</span>
                  <span className="history-moves">
                    {emojis[move.computer]} · {emojis[move.user]}
                  </span>
                  <span className={`history-result ${getHistoryResultClass(move.result)}`}>
                    {move.result}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}