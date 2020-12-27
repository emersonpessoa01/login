import React from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalConfirmDelete({ onDelete }) {
  const handleClose = () => {
    onDelete(false);
  };

  const handleDeleteOk = () => {
    onDelete(true);
  };

  const { flexRow, title } = styles;

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <div style={flexRow}>
          <span style={title}>Exluir Lançamento</span>
          <button
            className="waves-effect Default btn"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className="right-align">
          <button
            className="waves-effect waves-lights btn"
            style={{ marginRight: "5px" }}
            onClick={handleDeleteOk}
          >
            Sim
          </button>
          <button
            className="waves-effect waves-lights btn red"
            onClick={handleClose}
          >
            Não
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    paddingRight: "10px",
  },
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 1000 },
};
