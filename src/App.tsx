import useForms from "hooks/useForm";
import Form from "./components/Form";

const App = () => {
  const { values, errors, dirty, handleChange, handleSubmit } = useForms({
    initialValues: {
      name: "",
      email: "",
    },
    validations: {
      name: (val) => (val.trim() === "" ? "Name is required" : ""),
      email: (val) => (val.includes("@") ? "" : "Invalid email address"),
    },
    onSubmit: (formValues) => {
      alert(`Form submitted successfully with values: ${JSON.stringify(formValues)}`);
    },
  });

  return (
    <Form
      values={values}
      errors={errors}
      dirty={dirty}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default App;
