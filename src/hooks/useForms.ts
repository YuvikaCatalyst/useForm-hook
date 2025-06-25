import { useState, type ChangeEvent } from "react";

type UseFormArgs = {
  initialValues: {};
  validations: Record<string, (val: any) => string>;
  onSubmit: (value: any) => any;
};

const useForms = ({ initialValues, validations, onSubmit }: UseFormArgs) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDirty((prev) => ({ ...prev, [name]: true }));
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newErr: any = {};

    for(const [name,value] of Object.entries(values)){
       if(validations[name]){
        newErr[name]=validations[name](value);
       }
    }
    setErrors(newErr);
    if(Object.entries(newErr).find((a)=>a[1]!=="")) return;
    else onSubmit(values);
  };

  return {
    values,errors,dirty,handleChange,handleSubmit
  }
};

export default useForms;
