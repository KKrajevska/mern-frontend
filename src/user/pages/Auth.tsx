import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { UserT } from "lib/types";
import React, { useContext, useState } from "react";
import { Button } from "shared/components/FormElements/Button";
import { Input } from "shared/components/FormElements/Input";
import { Card } from "shared/components/UI/Card";
import { ErrorModal } from "shared/components/UI/ErrorModal";
import { LoadingSpinner } from "shared/components/UI/LoadingSpinner";
import { AuthContext } from "shared/context/authContext";
import { useForm } from "shared/hooks/formHook";
import { Method, useHttpClient } from "shared/hooks/httpHook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/util/validators";

export const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      try {
        const responseData: { user: UserT } = await sendRequest(
          "http://localhost:5000/api/users/login",
          Method.POST,
          JSON.stringify({
            email: formState.inputs.email && formState.inputs.email.value,
            password:
              formState.inputs.password && formState.inputs.password.value,
          })
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData: { user: UserT } = await sendRequest(
          "http://localhost:5000/api/users/signup",
          Method.POST,
          JSON.stringify({
            name: formState.inputs.name && formState.inputs.name.value,
            email: formState.inputs.email && formState.inputs.email.value,
            password:
              formState.inputs.password && formState.inputs.password.value,
          })
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
            validators={[VALIDATOR_MINLENGTH(6)]}
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
    </>
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
