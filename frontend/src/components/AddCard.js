import { useState } from "react";
import { FaAirbnb } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { BASE_SERVER_URL } from "../consts";

const AddCard = ({ text, token, setCards }) => {
  const [addMode, setAddMode] = useState(false);
  const [newCardName, setnewCardName] = useState("");

  const navigate = useNavigate();

  const AddCradToServer = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_SERVER_URL}/cards/`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        title: newCardName,
        boardID: 1,
      }),
    })
      .then((response) => {
        if (response.status !== 401) {
          return response.json();
        }
      })
      .then((response) => {
        setAddMode(false);
        //TODO change this to something better
        window.location.reload();
      });
  };

  return (
    <>
      {!addMode && (
        <div
          className="shadow p-1 mb-2 bg-white rounded"
          onClick={() => setAddMode(true)}
        >
          {text}
        </div>
      )}
      {addMode && (
        <div className="shadow p-1 mb-2 bg-white rounded">
          <Form onSubmit={AddCradToServer}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                placeholder="Enter title for card"
                onChange={(e) => {
                  setnewCardName(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add card
            </Button>
            <Button variant="primary" onClick={() => setAddMode(false)}>
              <FaAirbnb />
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddCard;
