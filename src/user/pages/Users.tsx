import styled from "@emotion/styled";
import { UserT } from "lib/types";
import React, { useEffect, useState } from "react";
import { ErrorModal } from "shared/components/UI/ErrorModal";
import { LoadingSpinner } from "shared/components/UI/LoadingSpinner";
import { useHttpClient } from "shared/hooks/httpHook";
import { UsersList } from "user/components/UsersList";

export const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setloadedUsers] = useState<UserT[] | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setloadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
    return () => {
      // second;
    };
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <LoadingWrapper>
          <LoadingSpinner asOverlay={false} />
        </LoadingWrapper>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

const LoadingWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
