import { Form } from "react-bootstrap";
import { FaCheckSquare } from "react-icons/fa";
import AddChecklist from "./AddChecklist";
import DetailRow from "./DetailRow";
import { useState } from "react";

const Checklist = ({ list }) => {
  const [Checklsit, setChecklist] = useState(list);

  return (
    <>
      <DetailRow Icon={FaCheckSquare} text="CheckList" />
      <div
        style={{
          width: "90%",
          margin: "auto",
          padding: "5px",
        }}
      >
        <Form>
          {Checklsit.map((item, index) => (
            <div key={`default-${index}`} className="mb-1">
              <Form.Check
                type="checkbox"
                id={`default-checkbox`}
                label={item}
              />
            </div>
          ))}
        </Form>
        <AddChecklist list={Checklsit} setChecklist={setChecklist} />
      </div>
    </>
  );
};

export default Checklist;
