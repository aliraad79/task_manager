import Member from "./Member";

const Comment = ({ text, name, picUrl }) => {
  return (
    <>
      <Member name={name} picUrl={picUrl} />
      <div
        style={{
          width: "80%",
          margin: "auto",
          padding: "5px",
          color: "white",
        }}
      >
        {text}
      </div>
    </>
  );
};

export default Comment;
