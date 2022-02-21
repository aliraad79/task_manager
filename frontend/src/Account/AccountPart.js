import { Col, Row } from "react-bootstrap";

const AccountPart = ({ title, value }) => {
  return (
    <Col>
      <center
        style={{
          border: "3px solid",
          borderColor: "#9E9E9E",
          marginTop: "20px",
          marginRight: "20px",
        }}
      >
        <h3>{title}</h3>
        <h5>{value}</h5>
      </center>
    </Col>
  );
};

export default AccountPart;
