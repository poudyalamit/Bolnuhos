import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/chats' element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
