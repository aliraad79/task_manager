import { useState } from "react";

import { FaComment, FaPlus } from "react-icons/fa";
import Comment from "../Items/Comment";
import DetailRow from "../Items/DetailRow";
import { Form } from "react-bootstrap";

const Comments = ({ list }) => {
  const [comments, setComments] = useState(list);
  const [newComment, setNewComment] = useState("");

  const UpdateComments = async (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div style={{ marginBottom: "10px", marginTop: "10px" }}>
      <DetailRow Icon={FaComment} text="Comments" />
      <Comment text="Comment1" name="Ali" picUrl="test.jpg" />
      <Comment text="Comment2" name="Ali" picUrl="test.jpg" />
      <Comment text="Comment3" name="Ali" picUrl="test.jpg" />
      <Comment text="Comment4" name="Ali" picUrl="test.jpg" />
      {/* Add Comment */}
      <div className="p-3 mb-3">
        <Form onSubmit={UpdateComments}>
          <Form.Group controlId="NewItem">
            <Form.Control
              placeholder="Comment"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
          </Form.Group>
          <div style={{ float: "right" }}>
            <FaPlus />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Comments;
