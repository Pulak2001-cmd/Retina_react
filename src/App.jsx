import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Patient from './components/Patient';
import Single from './components/Single';

function App() {
  const [count, setCount] = useState(false)

  return (
    <Routes>
      {count ? 
        <>
        <Route path='/single' element={<Home setCount={setCount} />} /> 
        <Route path='/patient' element={<Patient setCount={setCount} />} />
        <Route path='/' element={<Single setCount={setCount} />} />
        </>
        : 
        <>
          <Route path='/*' element={<Login setCount={setCount} />} />
        </>
      }
    </Routes>
  )
}

export default App
