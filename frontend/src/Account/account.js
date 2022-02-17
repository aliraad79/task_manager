import NavBar from "../components/NavBar";

import { useState } from "react";
import { Row, Container, Col, Image } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import AccountPart from "./AccountPart";

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
                <Row>
                  <center style={{ marginTop: "20px" }}>
                    <h5>Kafahmadi</h5>
                  </center>
                </Row>
              </center>
            </Col>
            <Col>
              <AccountPart title="Spaces" value="5" />
              <AccountPart title="Cards" value="43" />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Account;
