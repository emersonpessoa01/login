import React from "react";

export default function New({ onPersist }) {
  const handleNewLaunch = () => {
    onPersist(null);
  };

  return (
    <div className="col s3">
      <button
        href="#!"
        className="waves-effect waves-circle waves-light btn-floating secondary-content"
        onClick={handleNewLaunch}
      >
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}
