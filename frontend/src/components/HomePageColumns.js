import Card from "./Card";

import { Row, Col } from "react-bootstrap";
import AddCard from "./AddCard";

const HomePageColumns = ({ token, cards, setCards }) => {
  return (
    <>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <Row>
          <center>Backlog</center>
        </Row>
        {cards.map((task) => (
          <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
            <Card text={task} key={task} />
          </Row>
        ))}
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <center>TO DO</center>
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <center>Doing</center>
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <center>Review</center>
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <center>Done</center>
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
    </>
  );
};

export default HomePageColumns;
