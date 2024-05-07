import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const fetchdata=async()=>{
    try{

      const response = await fetch('http://localhost:9000/api/v1/movies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log(jsonData)

    }catch(error){
      console.log(error)
    }
  
  }

  return (
    <>
 <button onClick={fetchdata}>click me</button>
    </>
  )
}

export default App
