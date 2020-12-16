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

  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const numberFormat = (number) => {
    return formatter.format(number);
  };

  const handleValueChange = (event) => {
    const value = +event.target.value;
    setValue(value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value.trim();
    setDescription(category);
  };

  return (
    <div>
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

      </div>
    </div>
  );
}
