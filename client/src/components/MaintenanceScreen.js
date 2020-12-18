import React from "react";

const INSERTING = 0;
const EDITING = 1;

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const today = `${year}-${month}-${day}`;
  return today;
};

export default function MaintenanceScreen({ transaction, onCancel, onSave }) {
  const [description, setDescription] = React.useState("Nova descrição");
  const [value, setValue] = React.useState(100);
  const [category, setCategory] = React.useState("Nova Categoria");
  const [date, setDate] = React.useState(today());
  const [type, setType] = React.useState("-");
  const [mode, setMode] = React.useState(INSERTING);

  React.useEffect(() => {
    if (!transaction) {
      return;
    }

    const { description, value, category, yearMonthDay, type } = transaction;

    setDescription(description);
    setValue(value);
    setCategory(category);
    setDate(yearMonthDay);
    setType(type);
    setMode(EDITING);
  }, [transaction]);

  const handleDescriptionChange = (event) => {
    const description = event.target.value.trim();
    setDescription(description);
  };

  const handleValueChange = (event) => {
    const value = +event.target.value;
    setValue(value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value.trim();
    setCategory(category);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setDate(date);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setType(type);
  };

  const handleCancelClick = () => {
    onCancel();
  };

  const handleSaveClick = () => {
    const newTransaction = {
      _id: !!transaction ? transaction._id : null,
      description,
      value,
      type,
      yearMonthDay: date,
      category,
    };

    onSave(newTransaction);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <span>
          <label>
            <input
              name="expense_earning"
              type="radio"
              checked={type === "-"}
              onChange={handleTypeChange}
              value="-"
            />
            <span>Despesa</span>
          </label>
        </span>

        <span style={{ marginLeft: "30px " }}>
          <label>
            <input
              name="expense_earning"
              type="radio"
              checked={type === "+"}
              onChange={handleTypeChange}
              value="+"
            />
            <span>Receita</span>
          </label>
        </span>
      </div>

      <div className="input-field">
        <input
          autoFocus={true}
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          id="inputDescription"
        />
        <label htmlFor="inputDescription" className="active">
          Descrição:
        </label>
      </div>

      <div className="input-field">
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          id="inputValue"
        />
        <label htmlFor="inputValue" className="active">
          Valor(R$):
        </label>
      </div>

      <div className="input-field">
        <input
          type="text"
          value={category}
          onChange={handleCategoryChange}
          id="inputCategory"
        />
        <label htmlFor="inputCategory" className="active">
          Categoria:
        </label>
      </div>

      <div className="input-field">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          id="inputDate"
        />
        <label htmlFor="inputDate" className="active">
          Data:
        </label>
      </div>
      <button
        className="waves-effect waves-light btn"
        onClick={handleSaveClick}
      >
        Salvar
      </button>
      <button
        className="waves-effect waves-light btn red darken-7"
        style={{ marginLeft: "10px" }}
        onClick={handleCancelClick}
      >
        Cancelar
      </button>
    </div>
  );
}
