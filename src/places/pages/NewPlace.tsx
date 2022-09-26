import styled from "@emotion/styled";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "shared/components/FormElements/Button";
import { Input } from "shared/components/FormElements/Input";
import { ErrorModal } from "shared/components/UI/ErrorModal";
import { LoadingSpinner } from "shared/components/UI/LoadingSpinner";
import { AuthContext } from "shared/context/authContext";
import { useForm } from "shared/hooks/formHook";
import { apiHeaders, Method, useHttpClient } from "shared/hooks/httpHook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "shared/util/validators";

export const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        Method.POST,
        JSON.stringify({
          title: formState.inputs.title && formState.inputs.title.value,
          description:
            formState.inputs.description && formState.inputs.description.value,
          address: formState.inputs.address && formState.inputs.address.value,
          creator: auth.userId,
        }),
        apiHeaders()
      );
      navigate("/");
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Form onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          elementType="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          elementType="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          elementType="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: white;
`;
