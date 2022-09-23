import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, {
  FC,
  HTMLInputTypeAttribute,
  useEffect,
  useReducer,
} from "react";
import { validate, ValidatorT } from "shared/util/validators";
export type InputTypes =
  | "title"
  | "description"
  | "email"
  | "password"
  | "name"
  | "address";
interface InputT {
  elementType: string;
  id: InputTypes;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label: string;
  rows?: number;
  errorText: string;
  validators: ValidatorT[];
  onInput: (id: InputTypes, value: string, isValid: boolean) => void;
  value?: string;
  valid?: boolean;
}

interface State {
  value: string;
  isValid: boolean;
}

interface Action {
  type: "CHANGE" | "TOUCH";
  val?: string;
  validators?: ValidatorT[];
}

const inputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val || "",
        isValid:
          action.validators !== undefined &&
          validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

export const Input: FC<InputT> = ({
  elementType,
  type,
  id,
  placeholder,
  label,
  rows,
  errorText,
  validators,
  onInput,
  value,
  valid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: value || "",
    isTouched: false,
    isValid: valid || false,
  });

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  const element =
    elementType === "input" ? (
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        value={inputState.value}
        onChange={changeHandler}
        invalid={!inputState.isValid}
        onBlur={touchHandler}
      />
    ) : (
      <TextArea
        invalid={!inputState.isValid}
        id={id}
        rows={rows || 3}
        value={inputState.value}
        onBlur={touchHandler}
        onChange={changeHandler}
      />
    );

  return (
    <FormControl>
      <Label htmlFor={id}>{label}</Label>
      {element}
      {!inputState.isValid && <P invalid={!inputState.isValid}>{errorText}</P>}
    </FormControl>
  );
};

const FormControl = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label<{ invalid?: boolean }>`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${(props) => props.invalid && "red"};
`;

const getSharedStyling = ({ invalid }: { invalid: boolean }) => css`
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  background: #f8f8f8;
  padding: 0.15rem 0.25rem;
  :focus {
    outline: none;
    background: #ebebeb;
    border-color: #510077;
  }
  border-color: ${invalid && "red"};
  background: ${invalid && "#ffd1d1"};
`;

const InputField = styled.input<{ invalid: boolean }>`
  ${({ invalid }) => getSharedStyling({ invalid })}
`;

const TextArea = styled.textarea<{ invalid: boolean }>`
  ${({ invalid }) => getSharedStyling({ invalid })}
`;

const P = styled.p<{ invalid?: boolean }>`
  color: ${(props) => props.invalid && "red"};
`;
