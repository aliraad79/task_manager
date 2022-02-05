import { FaCircle } from "react-icons/fa";

const Comment = ({ text }) => {
  return (
    <>
      <div
        style={{
          width: "80%",
          border: "5px solid #FF0000",
          margin: "auto",
          padding: "5px",
          color: "white",
        }}
      >
        <FaCircle />
        {text}
      </div>
    </>
  );
};

export default Comment;
