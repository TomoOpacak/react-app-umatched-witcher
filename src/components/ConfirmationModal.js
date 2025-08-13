import AnimatedButton from "./AnimatedButton";

const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="modal-container">
    <div className="confirmation-modal">
      <p className="confirmation-text">Jeste li sigurni?</p>
      <p className="confirmation-description">
        Ova radnja će poništiti sve promjene i resetirati igru.
      </p>
      <div className="confirmation-buttons-container">
        <button className="rpg-button" onClick={onConfirm}>
          Da
        </button>
        <button className="rpg-button" onClick={onCancel}>
          Odustani
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
