import './App.css'
import GameList from './GameList'
import { useState } from "react";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='gameList'>
      <GameList/>
    </div>
  )
}

export default App
