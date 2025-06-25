import useForms from 'hooks/useForms';

const App = () => {
  const { values, errors, dirty, handleChange, handleSubmit } = useForms({
    initialValues: {
      name: "",
      email: "",
    },
    validations: {
      name: (val) => (val.trim() === "" ? "Name is required" : ""),
      email: (val) =>
        val.includes("@") ? "" : "Invalid email address",
    },
    onSubmit: (formValues) => {
      alert(`Form submitted successfully with values: ${JSON.stringify(formValues)}`);
    },
  });

  return (
    <div>
      <h2>Test Form</h2>
      <div>
        <label>
          Name:
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        {dirty.name && errors.name && (
          <div style={{ color: "red" }}>{errors.name}</div>
        )}
      </div>

      <div>
        <label>
          Email:
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        {dirty.email && errors.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
