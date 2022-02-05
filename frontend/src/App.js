import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import LogoImage from "./background.jpg";

var backgroundStyle = {
  backgroundImage: `url(${LogoImage})`,
  height: "100vh",
  zIndex: -2,
};

function App() {
  return (
    <div style={backgroundStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
