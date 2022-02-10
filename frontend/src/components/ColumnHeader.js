import Card from "./Card";

import { Row, Col } from "react-bootstrap";
import AddCard from "./AddCard";

const HomePageColumns = ({ text }) => {
  return (
    <Row>
      <center>
        <h2>{text}</h2>
      </center>
    </Row>
  );
};

export default HomePageColumns;
