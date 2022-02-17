import { useState } from "react";
import { Modal, Dropdown, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { BASE_SERVER_URL } from "../consts";

const AddSpace = ({ token }) => {
  const [spaceName, setSpaceName] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const AddNewSpace = async (event) => {
    event.preventDefault();
    // TODO fix this call after backend fixs
    await fetch(`${BASE_SERVER_URL}/space/`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        name: spaceName,
      }),
    })
      .then((response) => {
        if (response.status !== 401) {
          return response.json();
        }
      })
      .then((response) => {
        navigate(`/${spaceName}`);
      });
  };

  return (
    <>
      <div>
        <Dropdown.Item onClick={() => setShow(true)}>New Space</Dropdown.Item>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>New Space Name </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control onChange={(e) => setSpaceName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={AddNewSpace}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSpace;
