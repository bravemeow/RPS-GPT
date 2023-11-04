import { useState, useEffect } from 'react'
import './App.scss'

function App() {
  const [gptMove, setGptMove] = useState('');
  const [gptChat, setGptChat] = useState('');
  const [userMove, setUserMove] = useState('');
  const [userChat, setUserChat] = useState('');
  const [winner, setWinner] = useState('');
  const [streak, setStreak] = useState(0);
  const [isReceived, setIsReceived] = useState(true);
  const [isStart, setIsStart] = useState(false);

  const defaultConversation = [
    {"role": "system", "content": 'This is Rock Paper Scissors game! Please response only the following JSON format {"move": "Your move", "chat": "Say something to the opponent"}. Your choice must be random no matter what the user says. If the user asks you to choose a specific move, then chat to user something stabbing in their back. Chat must be less than 100 characters.'},
    {"role": "system", "content": '{"move": "", "chat": "You first move!""}'}
  ]
  const [conversation, setConversation] = useState(defaultConversation)

  const startGame = () => {
    setIsStart(true);
  }

  const checkWinner = (user: string, gpt: string) => {
    if ((user === "rock" && gpt === "scissors") || (user === "paper" && gpt === "rock") || (user === "scissors" && gpt === "paper")) {
      setStreak(streak+1)
      return "user"
    }
    else if (user === gpt) {
      return "tied"
    }
    else {
      setStreak(0)
      setConversation(defaultConversation)
      return "gpt"
    }
  }


  const clickMove = async (move: string) => {
    if (isReceived) {
      setIsReceived(false)
      setUserMove(move)
      let tmp_json = conversation
      tmp_json.push({
        "role": "user", 
        "content": 
        JSON.stringify({
          "move": move, 
          "chat": userChat
        })
      })
      setUserChat('')
      setConversation(tmp_json)
      var data = {
        "conversation": tmp_json
      }
      console.log(conversation)
      await fetch("/api/move", {
        method: "post",
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        setGptMove(data["move"])
        setGptChat(data["chat"])
        const winner = checkWinner(move, data["move"])
        setWinner(winner)
        setIsReceived(true)
      })
    }
    else {
      console.log("no")
    }
  }

  useEffect(() => {
  },[userMove, gptMove, isReceived, isStart])

  return (
    <>
      <div className="rps-wrapper">
        <div className="gpt-move">
          <div>{gptMove}</div>
          <div>{gptChat}</div>
        </div>
        
        <div className={isStart ? "hide" : "start-btn" }>
          <button onClick={() => {startGame()}}>Play</button>
        </div>
        <div className={isStart ? "win-streak" : "hide" }>
          Winning Streak : {streak}
        </div>
        <div className="user-buttons">
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button rock" value="rock">
            <img src="/rock.webp" alt="" />
          </button>
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button paper" value="paper">
            <img src="/paper.webp" alt="" />
          </button>
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button scissors" value="scissors">
            <img src="/scissors.webp" alt="" />
          </button>
        </div>
        <input type="text" value={userChat} onChange={(e) => setUserChat(e.target.value)}/>
      </div>
    </>
  )
}

export default App
