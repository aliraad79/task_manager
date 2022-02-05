import {
  Form,
  Button,
  FloatingLabel,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";
import MyNavbar from "./NavBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login_user = async (event) => {
    event.preventDefault();
    console.log(username, password);
    // await fetch(`${BASE_SERVER_URL}/login`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // })
    //   .then((response) => {
    //     if (response.status !== 401) {
    //       return response.json();
    //     } else {
    //       setShowModalError(true);
    //     }
    //   })
    //   .then((response) => {
    //     setAuthToken(`${response.token}`);
    //     navigate("/notes", { replace: true });
    //   });
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <center>
              <h2>Login</h2>
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
                borderColor: "#616161 #9bc5c3 #9bc5c3 #616161",
                fontWeight: "550",
              }}
            >
              <Form onSubmit={login_user}>
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
                  <Button variant="primary" type="submit">
                    Login
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

export default Login;
