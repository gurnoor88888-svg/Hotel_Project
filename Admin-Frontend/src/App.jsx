import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './log/Login';
import BookRoomdata from './pages/BookRoom';
function App() {
  return (
    <>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>

    <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/bookroom' element={<BookRoomdata/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
