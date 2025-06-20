import Logo from '../assets/logo.png'
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import soundOn from '../assets/sound-on.png'
import soundOff from '../assets/sound-off.png'

const Game = () => {

  const [cells,setCells] = useState(Array(9).fill(null));
  const [currentPlayer,setCurrentPlayer] = useState('X');
  const [status,setStatus] = useState("Player 'X' turn");
  const [gameOver,setGameOver] = useState(false);
  const [isMuted,setIsMuted] = useState(false);

  const clickSound = new Audio("src/assets/click.mp3");
  const winSound = new Audio("src/assets/win.mp3");

  const handleClick = (index) => {
    if(cells[index] || gameOver) return;

    // updating array
    const updatedCells = [...cells];
    updatedCells[index] = currentPlayer;
    setCells(updatedCells);

// win check
    if(checkWin(updatedCells)){
      winSound.muted = isMuted;
      winSound.play();
      toast.success(`Player ${currentPlayer} wins!`, { autoClose: 2000 });
      setStatus(`Player ${currentPlayer} Wins!!!`);
      setGameOver(true);
    }
// draw check
    else if(updatedCells.every(cell => cell)){
      toast.info("It's a Draw", {autoClose:2000});
      setStatus(`Its a Draw`);
      setGameOver(true);
    }
    else{
      clickSound.muted = isMuted;
      clickSound.play();
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'; // switching turns
      setCurrentPlayer(nextPlayer);
      setStatus(`Player '${nextPlayer}' turn`) // updating status
    }
  }

  // function to check Win
  const checkWin = (cells) => {
    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],
      [0,3,6], [1,4,7],[2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winPatterns.some(([a,b,c]) => 
        cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
    );
  }

  // function to Restart
  const restartGame = () => {
    toast.info("Game restarted. Player X begins!", { autoClose: 1500 });
    setCells(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus(`Player 'X' turn`);
    setGameOver(false);    
  }

  return (
   <> 
    <div className="p-3 flex justify-between">
      <img src={Logo} alt="logo" className="h-15"/>
      <img onClick={() => setIsMuted(!isMuted)} src={isMuted ? soundOff : soundOn} alt="sound" className="hidden md:block h-15" />
      </div>
    <div className="text-white text-2xl font-serif flex items-center justify-center flex-col p-4">
      <div className="grid grid-cols-3 place-items-center w-lvw h-lvw md:w-120 md:h-120 p-4">
        {cells.map((cell,index) => (
          <div key={index} onClick={() => handleClick(index)} className="border-2 flex items-center justify-center text-amber-50 cursor-pointer border-amber-50 w-20 h-20 rounded-2xl">
            {cell}
          </div>
        ))}
      </div>
      <div className="m-3">
            {status}
      </div>
      <button onClick={restartGame} className="border-2 text-amber-100 cursor-pointer p-2 rounded-md">Restart</button>
    
      <ToastContainer />
    </div>
   </>
  )
}

export default Game
