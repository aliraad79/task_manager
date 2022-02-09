import NavBar from "./NavBar";
import Card from "./Card";

import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import AddCard from "./AddCard";
import { BASE_SERVER_URL } from "../consts";

const HomePage = ({ getAuthToken, setAuthToken }) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const token = getAuthToken();

  useEffect(() => {
    const getNotes = async () => {
      await fetch(`${BASE_SERVER_URL}/cards/`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            setAuthToken("");
            navigate("/login");
          }
          if (response.status === 200) return response.json();
        })
        .then((response) =>
          setCards(response !== null ? response.map((x) => x.title) : [])
        );
    };
    getNotes();
  }, []);

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
            {cards.map((task) => (
              <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
                <Card text={task} key={task} />
              </Row>
            ))}
            <Row style={{ marginLeft: "2px", marginRight: "2px" }}>
              <AddCard text="Add Card" token={token} setCards={setCards} />
            </Row>
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
