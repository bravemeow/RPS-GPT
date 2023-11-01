import { useState} from 'react'
import './App.scss'

function App() {
  return (
    <>
      <div className="rps-wrapper">
        <div className="gpt-move"></div>
        <div className="user-buttons">
          <div className="button rock">
            <img src="/rock.png" alt="" />
          </div>
          <div className="button paper">
            <img src="/paper.png" alt="" />
          </div>
          <div className="button scissors">
            <img src="/scissors.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
