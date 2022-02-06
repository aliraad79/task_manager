import { Form } from "react-bootstrap";
import { FaCheckSquare } from "react-icons/fa";
import DetailRow from "./DetailRow";

const Checklist = ({ checklists }) => {
  return (
    <>
      <DetailRow Icon={FaCheckSquare} text="CheckList" />
      <div
        style={{
          width: "80%",
          border: "5px solid #FF0000",
          margin: "auto",
          padding: "5px",
          color: "white",
        }}
      >
        <Form>
          {checklists.map((item) => (
            <div key={`default-checkbox`} className="mb-1">
              <Form.Check
                type="checkbox"
                id={`default-checkbox`}
                label={item}
              />
            </div>
          ))}
        </Form>
      </div>
    </>
  );
};

export default Checklist;
