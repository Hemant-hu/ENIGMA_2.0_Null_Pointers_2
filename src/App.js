import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import "./styles/theme.css";
import Navbar from "./components/Navbar";


function App() {
  return (
   <Router>

  <div className="glow"></div>
  <div className="glow"></div>

  <Navbar />
  <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}


export default App;
