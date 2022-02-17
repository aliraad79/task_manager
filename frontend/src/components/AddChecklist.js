import { useState } from "react";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

import { BASE_SERVER_URL } from "../consts";

const AddChecklist = ({ token, list, setChecklist }) => {
  const [addMode, setAddMode] = useState(false);
  const [newItemName, setnewItemName] = useState("");

  const UpdateCard = async (event) => {
    event.preventDefault();
    setChecklist([...list, newItemName]);
    setnewItemName("");
    setAddMode(false);
  };

  return (
    <>
      {!addMode && (
        <div
          className="mb-2 rounded"
          style={{ textAlign: "center" }}
          onClick={() => setAddMode(true)}
        >
          Add <FaPlus />
        </div>
      )}
      {addMode && (
        <div className="shadow p-1 mb-2 rounded">
          <Form onSubmit={UpdateCard}>
            <Form.Group className="mb-1" controlId="NewItem">
              <Form.Control
                placeholder="Enter name for new item"
                onChange={(e) => {
                  setnewItemName(e.target.value);
                }}
              />
            </Form.Group>
            <center>
              <Button type="submit">Add</Button>
              <Button variant="primary" onClick={() => setAddMode(false)}>
                <FaTimesCircle />
              </Button>
            </center>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddChecklist;
