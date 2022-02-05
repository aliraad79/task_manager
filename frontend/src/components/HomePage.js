import NavBar from "./NavBar";
import Card from "./Card";

// import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

const HomePage = () => {
  // const [tasks, setTasks] = useState([]);
  // setTasks(["Task1", "Task2", "Task3"]);

  const tasks = ["Task1", "Task2", "Task3"];
  return (
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
