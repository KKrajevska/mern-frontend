import styled from "@emotion/styled";
import { PlaceT } from "lib/types";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "shared/components/FormElements/Button";
import { Input } from "shared/components/FormElements/Input";
import { Card } from "shared/components/UI/Card";
import { ErrorModal } from "shared/components/UI/ErrorModal";
import { LoadingSpinner } from "shared/components/UI/LoadingSpinner";
import { AuthContext } from "shared/context/authContext";
import { useForm } from "shared/hooks/formHook";
import { apiHeaders, Method, useHttpClient } from "shared/hooks/httpHook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "shared/util/validators";

export const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState<PlaceT | null>(null);
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        Method.PATCH,
        JSON.stringify({
          title: formState.inputs.title && formState.inputs.title.value,
          description:
            formState.inputs.description && formState.inputs.description.value,
        }),
        apiHeaders()
      );
      navigate("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <Wrapper>
        <LoadingSpinner asOverlay={false} />
      </Wrapper>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <Wrapper>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </Wrapper>
    );
  }

  if (isLoading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <Form onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            elementType="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Input
            id="description"
            elementType="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </Form>
      )}
    </>
  );
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
