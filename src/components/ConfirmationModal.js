import AnimatedButton from "./AnimatedButton";

const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "silver",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}
    >
      <p style={{ marginTop: "20px" }}>
        <svg width="400" height="40" viewBox="0 0 160 40">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="white"
            stroke="black"
            strokeWidth="3"
            paintOrder="stroke"
          >
            Jeste li sigurni da želite završiti igru?
          </text>
        </svg>
      </p>
      <div style={{ marginTop: "20px" }}>
        <AnimatedButton
          className="rpg-button"
          onClick={onConfirm}
          style={{ marginRight: "10px" }}
        >
          <svg width="160" height="40" viewBox="0 0 160 40">
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill="white"
              stroke="black"
              strokeWidth="3"
              paintOrder="stroke"
            >
              Da
            </text>
          </svg>
        </AnimatedButton>
        <AnimatedButton className="rpg-button" onClick={onCancel}>
          <svg width="160" height="40" viewBox="0 0 160 40">
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill="white"
              stroke="black"
              strokeWidth="3"
              paintOrder="stroke"
            >
              Odustani
            </text>
          </svg>
        </AnimatedButton>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
