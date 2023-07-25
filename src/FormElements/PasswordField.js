// PasswordField.jsx

import React from "react";

const PasswordField = ({ type, label, placeholder, value, onChange }) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        name={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordField;
