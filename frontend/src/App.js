import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./components/HomePage";
import Login from "./authentication/Login";
import LogoImage from "./background.jpg";
import { useCookies } from "react-cookie";
import { SESSION_AGE_IN_HOURS } from "./consts";
import SignUp from "./authentication/SignUp";
import Signout from "./authentication/Signout";
import Account from "./Account/account";

var backgroundStyle = {
  backgroundImage: `url(${LogoImage})`,
  height: "100vh",
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
          <Route
            path="/"
            element={
              <HomePage
                getAuthToken={getAuthToken}
                setAuthToken={setAuthToken}
              />
            }
          />

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
          <Route
            path="/account"
            element={
              <Account setAuthToken={setAuthToken} getAuthToken={getAuthToken} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
