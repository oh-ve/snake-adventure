import "./App.css";
import Jungle from "./components/levels/Jungle";
import Underwater from "./components/levels/Underwater";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Snake Adventure</h1>
      <Jungle />
      <Underwater />
    </div>
  );
}

export default App;
