import { Navigate, useNavigate } from "react-router-dom";
const Card = ({ text }) => {
  let navigate = useNavigate();
  return (
    <div
      className="shadow p-1 mb-2 bg-white rounded"
      onClick={() => navigate(`/detail/${text}`)}
    >
      {text}
    </div>
  );
};

export default Card;
