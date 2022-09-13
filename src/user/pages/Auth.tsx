import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Button } from "shared/components/FormElements/Button";
import { Input } from "shared/components/FormElements/Input";
import { Card } from "shared/components/UI/Card";
import { useForm } from "shared/hooks/formHook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/util/validators";

export const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email !== undefined &&
          formState.inputs.email.isValid &&
          formState.inputs.password !== undefined &&
          formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card cardStyles={CardStyle}>
      <h2>Login Required</h2>
      <hr />
      <Form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            elementType="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          elementType="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          elementType="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </Form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

const Form = styled.form`
  margin-bottom: 1rem;
`;
const CardStyle = css`
  width: 90%;
  max-width: 25rem;
  margin: 7rem auto;
  text-align: center;
`;
