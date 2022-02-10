import NavBar from "./NavBar";

import { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_SERVER_URL } from "../consts";
import HomePageColumns from "./HomePageColumns";

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
  });

  return !token ? (
    <Navigate to={{ pathname: "/login" }} />
  ) : (
    <>
      <NavBar />
      <Container style={{ maxWidth: "100%" }}>
        <Row>
          <HomePageColumns token={token} cards={cards} setCards={setCards} />
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
