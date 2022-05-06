import './App.css';
import {Route, Routes,} from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import CharacterCreate from './components/CharacterCreate'
import Detail from './components/Detail'

function App() {
  return (
    <div className="App">
    <Routes>
    <Route exact path="/" element = {<LandingPage/>}/>  
    <Route path='/home' element = {<Home/>}/>
    <Route path='/character' element={<CharacterCreate/>} />
   <Route path='/home/:id' element={<Detail/>} /> 
    </Routes>
    </div>
  );
}

export default App;
