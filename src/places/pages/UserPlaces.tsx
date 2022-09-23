import styled from "@emotion/styled";
import { PlaceT } from "lib/types";
import { PlaceList } from "places/components/PlaceList";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorModal } from "shared/components/UI/ErrorModal";
import { LoadingSpinner } from "shared/components/UI/LoadingSpinner";
import { useHttpClient } from "shared/hooks/httpHook";

export const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<PlaceT[] | null>(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const params = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${params.userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, params.userId]);

  const placeDeletedHandler = (deletedPlaceId: string) => {
    setLoadedPlaces((prevPlaces) =>
      (prevPlaces as PlaceT[]).filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <LoadingWrapper>
          <LoadingSpinner asOverlay={false} />
        </LoadingWrapper>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
    </>
  );
};
const LoadingWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
