import { useState, useEffect } from 'react'
import './App.scss'

function App() {
  const [botMove, setBotMove] = useState('');
  const [catChat, setCatChat] = useState('');
  const [userMove, setUserMove] = useState('');
  const [userChat, setUserChat] = useState('');
  const [winner, setWinner] = useState('');
  const [streak, setStreak] = useState(0);
  const [isReceived, setIsReceived] = useState(true);
  const [isStart, setIsStart] = useState(false);


  const startGame = () => {
    setIsStart(true);
  }

  const checkWinner = (winner: string) => {
    if (winner == "user") {
      setStreak(streak+1)
      return "user"
    }
    else if (winner == "tied") {
      return "tied"
    }
    else {
      setStreak(0)
      return "gpt"
    }
  }

  const clickMove = async (move: string) => {
    if (isReceived) {
      setIsReceived(false)
      setUserMove(move)
      setUserChat('')
      var data = {
        "userMove": move
      }
      await fetch("/api/move", {
        method: "post",
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        setBotMove(data['botMove'])
        console.log(data)
        const winner = checkWinner(data['winner'])
        setWinner(winner)
        setIsReceived(true)
      })
    }
    else {
      console.log("waiting...")
    }
  }

  useEffect(() => {
  },[userMove, botMove, isReceived, isStart])

  return (
    <>
      <div className="rps-wrapper">
        <div className="gpt-move">
          <div>{botMove}</div>
          <div>{catChat}</div>
        </div>
        
        <div className={isStart ? "hide" : "start-btn" }>
          <button onClick={() => {startGame()}}>Play</button>
        </div>
        <div className={isStart ? "win-streak" : "hide" }>
          Winning Streak : {streak}
        </div>
        <div className="your-move">
          Rock : {}
        </div>
        <div className="user-buttons">
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button rock" value="Rock">
            <img src="/rock.webp" alt="" />
          </button>
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button paper" value="Paper">
            <img src="/paper.webp" alt="" />
          </button>
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button scissors" value="Scissors">
            <img src="/scissors.webp" alt="" />
          </button>
        </div>
        <input type="text" value={userChat} onChange={(e) => setUserChat(e.target.value)}/>
      </div>
    </>
  )
}

export default App
