import { useState, type ChangeEvent } from "react";

type UseFormArgs = {
  initialValues: {
    [key: string]: any;
  };
  validations: {
    [key: string]: (val: any) => string;
  };
  onSubmit: (value: any) => any;
};

const useForms = ({ initialValues, validations, onSubmit }: UseFormArgs) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dirty, setDirty] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDirty((prev) => ({ ...prev, [name]: true }));
    setValues((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);
  };

  const handleValidation = (name: string, value: any) => {
    if (validations[name]) {
      setErrors((prev) => ({ ...prev, [name]: validations[name](value) }));
    }
  };

  const handleSubmit = () => {
    const newErr: any = {};
    const newDirty: { [key: string]: boolean } = {};

    for (const [name, value] of Object.entries(values)) {
      newDirty[name] = true;
      if (validations[name]) {
        newErr[name] = validations[name](value);
      }
    }
    setErrors(newErr);
    setDirty((prev) => ({ ...prev, ...newDirty }));
    if (Object.entries(newErr).find((a) => a[1] !== "")) return;
    else onSubmit(values);
  };

  return {
    values,
    errors,
    dirty,
    handleChange,
    handleSubmit,
  };
};

export default useForms;
