import { useState } from 'react';

const gpt = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState('Current Turn: X');
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (cells[index] || gameOver) return;

    const updatedCells = [...cells];
    updatedCells[index] = currentPlayer;
    setCells(updatedCells);

    if (checkWin(updatedCells)) {
      setStatus(`Player ${currentPlayer} wins!`);
      setGameOver(true);
    } else if (updatedCells.every(cell => cell)) {
      setStatus("It's a draw!");
      setGameOver(true);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatus(`Current Turn: ${nextPlayer}`);
    }
  };

  const checkWin = (cells) => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winPatterns.some(([a, b, c]) =>
      cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
    );
  };

  const restartGame = () => {
    setCells(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus('Current Turn: X');
    setGameOver(false);
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 w-max mx-auto">
        {cells.map((cell, index) => (
          <div
            key={index}
            className="w-24 h-24 text-3xl font-bold flex items-center justify-center border bg-white cursor-pointer hover:bg-gray-100"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xl">{status}</p>
      <button
        onClick={restartGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Restart
      </button>
    </div>
  );
};

export default gpt;