import { useState } from "react";

type ValidationFn<T> = (values: T) => Partial<Record<keyof T, string>>;

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validate: ValidationFn<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors = validate(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    validateForm,
    setValues,
  };
}
