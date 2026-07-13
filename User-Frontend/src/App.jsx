import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './log/Signup'
import Login from './log/Login';
import BookHotel from './pages/BookHotel';
function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/book-hotel' element={<BookHotel />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
