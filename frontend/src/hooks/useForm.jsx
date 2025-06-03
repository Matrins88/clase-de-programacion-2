import { useState } from "react";

// LA RESPONSABILIDAD DEL HOOK USEFORM ES MANEJAR LA LÓGICA DEL FORMULARIO
const useForm = ({ onSubmit }) => {
  const [form_state, setFormState] = useState({ email: '', password: '' });

  // función que maneja eventos del input
  const handleChange = (event) => {
    const value = event.target.value;
    const field_name = event.target.name;

    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [field_name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(form_state); // asegurate de pasarle el estado actual
  };

  return {
    form_state,
    handleSubmit,
    handleChange,
  };
};

export default useForm;
