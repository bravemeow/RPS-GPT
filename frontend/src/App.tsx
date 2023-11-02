import { useState, useEffect } from 'react'
import './App.scss'

function App() {
  const [gptMove, setGptMove] = useState('');
  const [gptChat, setGptChat] = useState('');
  const [userMove, setUserMove] = useState('');
  const [userChat, setUserChat] = useState('');
  const [isReceived, setIsReceived] = useState(true);
  const [conversation, setConversation] = useState([
    {"role": "system", "content": "Let's play Rock Paper Scissors game! Please response only the following JSON format {'move': 'Your move', 'chat': 'Say something to the opponent'}"}
  ])

  const clickMove = async (move: string) => {
    if (isReceived) {
      console.log("hi?")
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
        setGptMove(data['move'])
        setGptChat(data['chat'])
        console.log(data)
        setIsReceived(true)
      })
    }
    else {
      console.log("no")
    }
  }

  useEffect(() => {
  },[userMove, gptMove, isReceived])

  return (
    <>
      <div className="rps-wrapper">
        <div className="gpt-move">
          <div>{gptMove}</div>
          <div>{gptChat}</div>
        </div>
        <div className="user-buttons">
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button rock" value="rock">
            <img src="/rock.png" alt="" />
          </button>
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button paper" value="paper">
            <img src="/paper.png" alt="" />
          </button>
          <button onClick={(e) => {clickMove(e.currentTarget.value)}} className="button scissors" value="scissors">
            <img src="/scissors.png" alt="" />
          </button>
        </div>
        <input type="text" value={userChat} onChange={(e) => setUserChat(e.target.value)}/>
      </div>
    </>
  )
}

export default App
