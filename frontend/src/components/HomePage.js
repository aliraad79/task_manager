import NavBar from "./NavBar";
import Card from "./Card";

// import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {  Navigate } from "react-router-dom";

const HomePage = ({ getAuthToken }) => {
  // const [tasks, setTasks] = useState([]);
  // setTasks(["Task1", "Task2", "Task3"]);

  const tasks = ["Task1", "Task2", "Task3"];
  const token = getAuthToken();
  return !token ? (
    <Navigate to={{ pathname: "/login" }} />
  ) : (
    <>
      <NavBar />
      <Container style={{ maxWidth: "100%" }}>
        <Row>
          <Col style={{ backgroundColor: "#EBECF0" }}>
            <Row>
              <center>Column 1</center>
            </Row>
            {tasks.map((task) => (
              <Row>
                <Card text={task} key={task} />
              </Row>
            ))}
          </Col>
          <Col>2 of 7</Col>
          <Col>3 of 7</Col>
          <Col>4 of 7</Col>
          <Col>5 of 7</Col>
          <Col>6 of 7</Col>
          <Col>7 of 7</Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
