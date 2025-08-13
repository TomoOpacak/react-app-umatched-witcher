const DeadCharacterOverlay = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="red-x-overlay"
    style={{}}
  >
    <line x1="0" y1="0" x2="100" y2="100" stroke="red" strokeWidth="10" />
    <line x1="100" y1="0" x2="0" y2="100" stroke="red" strokeWidth="10" />
  </svg>
);

export default DeadCharacterOverlay;
