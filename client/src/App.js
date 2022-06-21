import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './Components/Landing.jsx'
import Home from './Components/Home.jsx'
import Notfound from'./Components/Notfound.jsx'
import Details from './Components/Details'
import CreateVideogame from './Components/CreateVideogame';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Landing />}/>
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/videogame/:id' element={<Details/>} />
          <Route exact path='/createvideogame' element={<CreateVideogame/>} />
          <Route path='*' element={<Notfound />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
