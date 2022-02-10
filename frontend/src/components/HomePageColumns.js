import Card from "./Card";

import { Row, Col } from "react-bootstrap";
import AddCard from "./AddCard";

import ColumnHeader from "./ColumnHeader";

const HomePageColumns = ({ token, cards, setCards }) => {
  return (
    <>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <ColumnHeader text="Backlog" />
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
        <ColumnHeader text="TO DO" />
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <ColumnHeader text="Doing" />
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <ColumnHeader text="Review" />
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
      <Col style={{ backgroundColor: "#EBECF0" }}>
        <ColumnHeader text="Done" />
        <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
          <AddCard text="Add Card" token={token} setCards={setCards} />
        </Row>
      </Col>
    </>
  );
};

export default HomePageColumns;
