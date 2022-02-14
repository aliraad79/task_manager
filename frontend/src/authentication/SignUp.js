import {
  Form,
  Button,
  FloatingLabel,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_SERVER_URL } from "../consts";
import MyNavbar from "../components/NavBar";

const SignUp = ({ getAuthToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup_user = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_SERVER_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        if (response) navigate("/login");
      });
  };

  const token = getAuthToken();
  return token ? (
    <Navigate to={{ pathname: "/" }} />
  ) : (
    <>
      <MyNavbar getAuthToken={getAuthToken} />
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <center>
              <h2>Sign Up</h2>
            </center>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <div
              style={{
                boxShadow: "5px 5px 2px #9E9E9E",
                border: "6px solid",
                borderColor: "#9bc5c3 #616161 #616161 #9bc5c3",
                fontWeight: "550",
              }}
            >
              <Form onSubmit={signup_user}>
                <FloatingLabel label="Username">
                  <Form.Control
                    type="username"
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </FloatingLabel>

                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <center>
                  <Button variant="info" type="submit">
                    Sign UP
                  </Button>
                </center>
              </Form>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
