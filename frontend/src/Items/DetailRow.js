const DetailRow = ({ Icon, text }) => {
  return (
    <div style={{ marginBottom: "10px", marginTop: "10px" }}>
      <Icon />
      <div style={{ marginLeft: "10px", display: "inline" }}>{text}</div>
    </div>
  );
};

export default DetailRow;
