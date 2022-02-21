import { Modal, Container, Form, Col, Row } from "react-bootstrap";
import { useState } from "react";

import { FaAddressCard, FaInfo } from "react-icons/fa";
import Checklist from "./Checklist";
import Member from "../Items/Member";
import DetailRow from "../Items/DetailRow";
import Comments from "./Comments";
import AddMember from "./AddMemberToCard";

const Card = ({ text }) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");

  const mockCheckList = ["ali", "test", "hello this is me"];

  const handleClose = () => {
    // Update task in server
    setShow(false);
  };
  return (
    <>
      <div
        className="shadow p-1 mb-2 bg-white rounded"
        onClick={() => setShow(true)}
      >
        {text}
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <DetailRow Icon={FaAddressCard} text={text} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            style={{
              height: "80vh",
              backgroundColor: "#b39647",
              margin: "auto",
              padding: "10px",
              color: "white",
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            <Row>
              <Col xs={8}>
                <div>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>
                        <DetailRow Icon={FaInfo} text="Description" />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <Checklist list={mockCheckList} />
                <Comments />
              </Col>
              <Col>
                <div>
                  <DetailRow Icon={FaAddressCard} text="Members" />
                  <Member name="Ali" picUrl="test.jpg" />
                  <Member name="Ali" picUrl="test.jpg" />
                  <Member name="Ali" picUrl="test.jpg" />
                  <Member name="Ali" picUrl="test.jpg" />
                </div>
                <AddMember />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Card;
