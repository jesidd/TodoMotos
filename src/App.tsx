import { useState } from 'react'
import Home from './pages/Home/Home'

import './App.css'
import Footer from './components/Footer/Footer'
import Banner from './components/Banner/Banner'

function App() {
  const [count, setCount] = useState(0)

  return (
    < >
      <Home/>
      <Banner/>
      <Footer/> 
    </>
  )
}

export default App
