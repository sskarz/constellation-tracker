import { Component } from "react";
import Navbar from "./Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Prompt from "./pages/Prompt.jsx";
import Details from "./pages/Details.jsx";
import HabitMap from "./habitTracker.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/details" element={<Details />} />
          <Route path="/habitTracker" element={<HabitMap />} />
          <Route path = "/habitTracker" element={<HabitMap />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
