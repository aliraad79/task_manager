import { Modal, Button, Container, Form, Col, Row } from "react-bootstrap";
import { useState } from "react";

import { FaAddressCard, FaInfo, FaPlus, FaComment } from "react-icons/fa";
import Comment from "./Comment";
import Checklist from "./Checklist";
import Member from "./Member";
import DetailRow from "./DetailRow";

const CardDetail = ({ setShowModal, startState }) => {
  const [show, setShow] = useState(startState);
  const mock = ["ali", "test"];
  // console.log(startState);

  const handleClose = () => {
    // Update task in server
    setShowModal(false);
    setShow(false);
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <DetailRow Icon={FaAddressCard} text="Card Title" />
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
                <Checklist checklists={mock} />
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
                  Members
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
                <div>
                  <Button>
                    <FaPlus />
                    Add Check List
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

export default CardDetail;
