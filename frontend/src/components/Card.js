const Card = ({ text }) => {
  return (
    <div
      className="shadow p-1 mb-2 bg-white rounded"
      onClick={() => console.log("Should open card detail")}
    >
      {text}
    </div>
  );
};

export default Card;
