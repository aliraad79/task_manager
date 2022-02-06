import { Container, Form, Col, Row, Button } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { FaAddressCard, FaInfo, FaPlus, FaComment } from "react-icons/fa";
import Comment from "./Comment";
import Checklist from "./Checklist";
import Member from "./Member";
import DetailRow from "./DetailRow";

const CardDetail = () => {
  const { id } = useParams();
  const mock = ["ali", "test"];

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
          <DetailRow Icon={FaAddressCard} text="Card Title" />
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
  );
};

export default CardDetail;
