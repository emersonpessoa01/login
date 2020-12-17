import React from "react";

export default function MaintenanceScreen({ transaction }) {
  const [description, setDescription] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState("");
  const [type, setType] = React.useState("-");

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
    setDescription(category);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setDate(date);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setType(type);
  };

  return (
    <div>
      <div style={{marginBottom:"0px"}}>
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

        <span style={{marginLeft:"30px "}}>
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
      <button className="waves-effect waves-light btn">Salvar</button>
      <button className="waves-effect waves-light btn red darken-7" style={{marginLeft:"10px"}}>Cancelar</button>

    </div>
  );
}
