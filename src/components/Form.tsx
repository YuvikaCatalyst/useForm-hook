import React from "react";

type FormProps = {
  values: Record<string, string>;
  errors: Record<string, string>;
  dirty: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const Form = ({ values, errors, dirty, handleChange, handleSubmit }: FormProps) => {
  return (
    <div>
      <h2>Test Form</h2>
      <div>
        <label>
          Name:
          <input name="name" value={values.name} onChange={handleChange} />
        </label>
        {dirty.name && errors.name && (
          <div style={{ color: "red" }}>{errors.name}</div>
        )}
      </div>

      <div>
        <label>
          Email:
          <input name="email" value={values.email} onChange={handleChange} />
        </label>
        {dirty.email && errors.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;
