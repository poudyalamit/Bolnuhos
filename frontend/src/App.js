import './App.css';
import  {Route}  from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
      <Route  exact path='/' component={Home}></Route>
      <Route exact path='/chats' component={Chat}></Route>
    </div>
  );
}

export default App;
