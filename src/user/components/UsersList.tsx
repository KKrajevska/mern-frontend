import styled from "@emotion/styled";
import { UserT } from "lib/types";
import React, { FC } from "react";
import { Card } from "shared/components/UI/Card";
import { UserItem } from "user/components/UserItem";

interface UsersListT {
  items: UserT[];
}

export const UsersList: FC<UsersListT> = ({ items }) => {
  return items.length > 0 ? (
    <UL>
      {items.map((item, idx) => (
        <UserItem key={idx} {...item} />
      ))}
    </UL>
  ) : (
    <Card>
      <h2>No users found.</h2>
    </Card>
  );
};

const UL = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
