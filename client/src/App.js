import './App.css';
import {Route} from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import React from 'react';

function App() {
  return (
    <div>
    <Route exact path={"/"} render = {() => <LandingPage/>}/> 
    <Route path={"/home"} render = {() => <Home/>}/>
    </div>
  );
}

export default App;
