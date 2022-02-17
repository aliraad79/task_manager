import { Row } from "react-bootstrap";

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
