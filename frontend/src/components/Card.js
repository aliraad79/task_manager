import { Modal, Button, Container, Form, Col, Row } from "react-bootstrap";
import { useState } from "react";

import { FaAddressCard, FaInfo, FaPlus, FaComment } from "react-icons/fa";
import Comment from "./Comment";
import Checklist from "./Checklist";
import Member from "./Member";
import DetailRow from "./DetailRow";

const Card = ({ text }) => {
  const [show, setShow] = useState(false);
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
              height: "70vh",
              backgroundColor: "#1A9393",
              margin: "auto",
              padding: "10px",
              color: "white",
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
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Form>
                </div>
                <Checklist list={mockCheckList} />
                <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                  <DetailRow Icon={FaComment} text="Comments" />
                  <Comment text="Comment1" name="Ali" picUrl="test.jpg" />
                  <Comment text="Comment2" name="Ali" picUrl="test.jpg" />
                  <Comment text="Comment3" name="Ali" picUrl="test.jpg" />
                  <Comment text="Comment4" name="Ali" picUrl="test.jpg" />
                </div>
              </Col>
              <Col>
                <div>
                  <DetailRow Icon={FaAddressCard} text="Members" />
                  <Member name="Ali" picUrl="test.jpg" />
                  <Member name="Ali" picUrl="test.jpg" />
                  <Member name="Ali" picUrl="test.jpg" />
                  <Member name="Ali" picUrl="test.jpg" />
                </div>
                <div>
                  <Button>
                    <FaPlus />
                    Add member
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Card;
