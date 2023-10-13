import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Favourites from "./Components/Favourites";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar/>
      <switch>
      <Route path='/' exact render={(props)=>(
        <>
           <Banner {...props}/>
           <Movies {...props}/>
        </>
      )}/>
      <Route path='/favourites' component={Favourites}/>
      </switch>
    </Router>
  );
}

export default App;
