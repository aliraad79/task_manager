import { Container, Form, Col, Row, Button } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { FaAddressCard, FaInfo, FaCircle, FaPlus } from "react-icons/fa";
import Comment from "./Comment";

const CardDetail = () => {
  const { id } = useParams();

  return (
    <Container
      style={{
        width: "70%",
        height: "100vh",
        backgroundColor: "#1A9393",
        border: "5px solid #FFFF00",
        margin: "auto",
        padding: "10px",
        color: "white",
      }}
    >
      <Row>
        <Col xs={8}>
          <div>
            <FaAddressCard />
            Card Title
          </div>
          <div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <FaInfo /> Description{" "}
                </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </div>
          <div>Checklist</div>
          <div>
            Comments
            <Comment text={"Comment1"}/>
            <Comment text={"Comment2"}/>
            <Comment text={"Comment3"}/>
            <Comment text={"Comment4"}/>
          </div>
        </Col>
        <Col>
          <div>
            Members
            <br />
            <FaCircle />
            <br /> <FaCircle />
            <br /> <FaCircle />
            <br /> <FaCircle />
            <br />
            <FaCircle />
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
  );
};

export default CardDetail;
