import NavBar from "../components/NavBar";

import { useState } from "react";
import { Row, Container, Col, Image } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const Account = ({ getAuthToken, setAuthToken }) => {
  const token = getAuthToken();
  const pic_url = `/images/test.jpg`;

  return !token ? (
    <Navigate to={{ pathname: "/login" }} />
  ) : (
    <>
      <NavBar inAccount={true} />
      <Container style={{ maxWidth: "50%", maxHeight: "50%" }}>
        <div
          style={{
            backgroundColor: "#EBECF0",
            height: "800px",
            opacity: "0.9",
          }}
        >
          <Row>
            <Col>
              <center>
                <Image
                  style={{ width: "150px", height: "150px", marginTop: "20px" }}
                  roundedCircle="true"
                  src={pic_url}
                />
              </center>
            </Col>
            <Col>
              <Row>
                <Col>
                  <center
                    style={{
                      border: "6px solid",
                      borderColor: "#9E9E9E",
                      marginTop: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <h3>Username</h3>
                    <h5 style={{ paddingLeft: "25px" }}>Kafahmadi</h5>
                  </center>
                </Col>
              </Row>
              <Row>
                <Col>
                  <center
                    style={{
                      border: "6px solid",
                      borderColor: "#9bc5c3",
                      marginTop: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <h3>Spaces</h3>
                    <h5>5</h5>
                  </center>
                </Col>
              </Row>
              <Row>
                <Col>
                  <center
                    style={{
                      border: "6px solid",
                      borderColor: "#616161",
                      marginTop: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <h3>Cards</h3>
                    <h5>43</h5>
                  </center>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Account;
