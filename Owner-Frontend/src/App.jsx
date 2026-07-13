import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './log/Home'
import Login from './log/Login';
import AddRoom from './pages/addroom';


function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>

        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/add-hotel' element={<AddRoom />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
