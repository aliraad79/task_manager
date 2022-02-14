import { Image } from "react-bootstrap";

const Member = ({ name, picUrl }) => {
  const pic_url = `/images/${picUrl}`;
  return (
    <div style={{ marginLeft: "5px", marginBottom: "5px" }}>
      <Image
        style={{ width: "30px", height: "30px" }}
        roundedCircle="true"
        src={pic_url}
      />
      <div style={{ marginLeft: "10px", display: "inline" }}>{name}</div>
    </div>
  );
};

export default Member;
