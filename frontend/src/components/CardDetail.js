import NavBar from "./NavBar";

import { Row, Col, Container } from "react-bootstrap";

import { useParams } from "react-router-dom";

const CardDetail = () => {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <center>{id}</center>
    </>
  );
};

export default CardDetail;
