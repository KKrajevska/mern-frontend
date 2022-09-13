import { useCallback, useReducer } from "react";
import { InputTypes } from "shared/components/FormElements/Input";
interface Title {
  value: string;
  isValid: boolean;
}

interface Description extends Title {}

interface Address extends Title {}

interface Email extends Title {}

interface Password extends Title {}

interface Name extends Title {}
interface Inputs {
  title?: Title;
  description?: Description;
  address?: Address;
  email?: Email;
  password?: Password;
  name?: Name;
}

interface State {
  inputs: Inputs;
  isValid: boolean;
}

type Actions =
  | {
      type: "INPUT_CHANGE";
      isValid: boolean;
      inputId: InputTypes;
      value: string;
    }
  | { type: "SET_DATA"; inputs: Inputs; formIsValid: boolean };

const formReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        const inputs = state.inputs[inputId as InputTypes];
        if (!inputs) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && inputs.isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: Inputs,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  console.log("val", formState);

  const inputHandler = useCallback(
    (id: InputTypes, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: Inputs, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData] as [
    State,
    (id: InputTypes, value: string, isValid: boolean) => void,
    (inputData: Inputs, formValidity: boolean) => void
  ];
};
