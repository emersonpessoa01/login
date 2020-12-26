import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalForm({ onCloseModal, onSave, onLaunch }) {
  const [objectLaunch, setObjectLaunch] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (onLaunch !== null) {
      setObjectLaunch(onLaunch);
      setIsEdit(true);
      return;
    }

    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const launch = {
      value: 0,
      category: "",
      description: "",
      year: date.getFullYear(),
      month: +month,
      day: +day,
      yearMonth: `${date.getFullYear()}-${month}`,
      yearMonthDay: `${date.getFullYear()}-${month}-${day}`,
      type: "-",
    };

    setObjectLaunch(launch);
  }, [onLaunch]);

  const validate = () => {
    const getLaunch = objectLaunch;

    const valid =
      getLaunch.description !== null &&
      getLaunch.description !== "" &&
      getLaunch.category !== null &&
      getLaunch.category !== "" &&
      getLaunch.value > 0;

    setIsValid(valid);
  };

  const handleClose = () => {
    onCloseModal();
  };

  const handleTypeLaunch = (event) => {
    const getLaunch = objectLaunch;

    getLaunch.type = event.target.value;
    setObjectLaunch(getLaunch);

    validate();
  };

  const handleDescription = (event) => {
    const getLaunch = objectLaunch;

    getLaunch.description = event.target.value;
    setObjectLaunch(getLaunch);

    validate();
  };

  const handleCategory = (event) => {
    const getLaunch = objectLaunch;

    getLaunch.category = event.target.value;
    setObjectLaunch(getLaunch);

    validate();
  };

  const handleValue = (event) => {
    const getLaunch = objectLaunch;

    getLaunch.value = +event.target.value;
    setObjectLaunch(getLaunch);

    validate();
  };

  const handleDate = (event) => {
    const getLaunch = objectLaunch;
    const date = event.target.value.split("-");

    console.log(date);

    getLaunch.year = +date[0];
    getLaunch.month = +date[1];
    getLaunch.day = +date[2];
    getLaunch.yearMonth = `${date[0]}-${date[1]}`;
    getLaunch.yearMonthDay = event.target.value;

    setObjectLaunch(getLaunch);

    validate();
  };

  const handleClickSave = () => {
    if (!isValid) return;

    onSave(objectLaunch, isEdit);
  };

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <div style={styles.flexRow}>
          <span style={styles.title}>
            {onLaunch === null ? "Incluir" : "Editar"} Lançamento
          </span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className="row">
          <div className="col s6">
            <label>
              <input
                name="tipo"
                type="radio"
                disabled={isEdit}
                defaultChecked={
                  objectLaunch != null && objectLaunch.type === "-"
                }
                onChange={handleTypeLaunch}
                value="-"
              />
              <span>Despesa</span>
            </label>
          </div>
          <div className="col s6">
            <label>
              <input
                name="tipo"
                type="radio"
                disabled={isEdit}
                defaultChecked={
                  objectLaunch != null && objectLaunch.type === "+"
                }
                onChange={handleTypeLaunch}
                value="+"
              />
              <span>Receita</span>
            </label>
          </div>
          <div className="input-field col s12">
            <input
              placeholder="Informe uma descrição"
              id="description"
              name="description"
              type="text"
              className="validate"
              defaultValue={
                objectLaunch != null && objectLaunch.description
              }
              onChange={handleDescription}
            />
            <label htmlFor="description" className="active">
              Descrição
            </label>
          </div>
          <div className="input-field col s12">
            <input
              placeholder="Informe uma categoria"
              id="category"
              name="category"
              type="text"
              className="validate"
              defaultValue={
                objectLaunch != null && objectLaunch.category
              }
              onChange={handleCategory}
            />
            <label htmlFor="category" className="active">
              Categoria
            </label>
          </div>
          <div className="input-field col s6">
            <input
              id="value"
              name="value"
              type="number"
              step=".01"
              min="0"
              className="validate"
              defaultValue={objectLaunch != null && objectLaunch.value}
              onChange={handleValue}
            />
            <label htmlFor="value" className="active">
              Valor
            </label>
          </div>
          <div className="input-field col s6">
            <input
              id="date"
              name="date"
              type="date"
              className="validate"
              defaultValue={
                objectLaunch != null && objectLaunch.yearMonthDay
              }
              onChange={handleDate}
            />
            <label htmlFor="date" className="active">
              Data
            </label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn waves-effect waves-light"
            disabled={!isValid}
            onClick={handleClickSave}
          >
            Salvar
          </button>
        </div>
        <div></div>
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
  },
  erroMessage: {
    color: "red",
    fontWeight: "bold",
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
