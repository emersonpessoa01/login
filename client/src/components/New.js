import React from "react";

export default function New({ onPersist }) {
  const handleNewLaunch = () => {
    onPersist(null);
  };

  return (
    <div className="col s3">
      <button
        className="btn waves-effect waves-light"
        onClick={handleNewLaunch}
      >
        NOVO LANÇAMENTO
      </button>
    </div>
  );
}
