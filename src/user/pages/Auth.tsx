import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { APIError } from "api/errors";
import React, { useContext, useState } from "react";
import { Button } from "shared/components/FormElements/Button";
import { Input } from "shared/components/FormElements/Input";
import { Card } from "shared/components/UI/Card";
import { LoadingSpinner } from "shared/components/UI/LoadingSpinner";
import { AuthContext } from "shared/context/authContext";
import { useForm } from "shared/hooks/formHook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/util/validators";

export const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>();

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

  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        setisLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: formState.inputs.name?.value,
            email: formState.inputs.email?.value,
            password: formState.inputs.password?.value,
          }),
        });
        const responseData = await response.json();
        console.log("response", responseData);
      } catch (err) {
        if (err instanceof APIError) {
          seterror(err.message);
        }
      }
    }
    setisLoading(false);
    auth.login();
  };

  return (
    <Card cardStyles={CardStyle}>
      {isLoading && <LoadingSpinner asOverlay />}
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
