import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { FaPlus } from "react-icons/fa";

const AddMember = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <center>
        <Button
          style={{ backgroundColor: "#88963f", borderColor: "#88963f" }}
          onClick={() => setShow(true)}
        >
          <FaPlus />
          Add member
        </Button>
      </center>
      <Modal size="ml" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Select Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Fix this to get all members from backend */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#88963f", borderColor: "#88963f" }}
          >
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMember;
