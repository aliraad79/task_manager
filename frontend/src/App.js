import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import LogoImage from "./background.jpg";
import CardDetail from "./components/CardDetail";
import { useCookies } from "react-cookie";
import { SESSION_AGE_IN_HOURS } from "./consts";
import SignUp from "./components/SignUp";
import Signout from "./components/Signout";

var backgroundStyle = {
  backgroundImage: `url(${LogoImage})`,
  height: "100vh",
  zIndex: -2,
};

function App() {
  const [cookies, setCookie] = useCookies(["authToken"]);
  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + SESSION_AGE_IN_HOURS);

  const setAuthToken = (token) => {
    setCookie("authToken", `${token}`, { expires: expireDate });
  };

  const getAuthToken = () => {
    return cookies.authToken;
  };
  return (
    <div style={backgroundStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage getAuthToken={getAuthToken} />} />

          <Route
            path="/login"
            element={
              <Login setAuthToken={setAuthToken} getAuthToken={getAuthToken} />
            }
          />
          <Route
            path="/signup"
            element={<SignUp getAuthToken={getAuthToken} />}
          />
          <Route
            path="/signout"
            element={<Signout setAuthToken={setAuthToken} />}
          />
          <Route path="/detail/:id" element={<CardDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
