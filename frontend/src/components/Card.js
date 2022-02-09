import CardDetail from "./CardDetail";
import { useState } from "react";

const Card = ({ text }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="shadow p-1 mb-2 bg-white rounded"
      onClick={() => setShowModal(true)}
    >
      {showModal && (
        <CardDetail setShowModal={setShowModal} startState={true} />
      )}
      {text}
    </div>
  );
};

export default Card;
