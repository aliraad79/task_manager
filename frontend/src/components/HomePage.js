import LogoImage from "../background.jpg";
import NavBar from "./NavBar";
import Card from "./Card";

import { useState } from "react";
import { Row, Col } from "react-bootstrap";

var sectionStyle = {
  backgroundImage: `url(${LogoImage})`,
};
const HomePage = () => {
  // const [tasks, setTasks] = useState([]);
  // setTasks(["Task1", "Task2", "Task3"]);

  const tasks = ["Task1", "Task2", "Task3"];
  return (
    <div style={sectionStyle}>
      <NavBar />
      <center>
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
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
          <Col>3 of 3</Col>
          <Col>3 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </center>
    </div>
  );
};

export default HomePage;
