import "./App.css";
import Jungle from "./components/levels/Jungle";
import Underwater from "./components/levels/Underwater";
import Bushland from "./components/levels/Bushland";
import Desert from "./components/levels/Desert";
import Mountains from "./components/levels/Mountains";
import Forest from "./components/levels/Forest";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Snake Adventure</h1>
      <Routes>
        <Route path="/jungle" element={<Jungle />} />
        <Route path="/underwater" element={<Underwater />} />
        <Route path="/bushland" element={<Bushland />} />
        <Route path="/desert" element={<Desert />} />
        <Route path="/mountains" element={<Mountains />} />
        <Route path="/forest" element={<Forest />} />
      </Routes>
    </div>
  );
}

export default App;
