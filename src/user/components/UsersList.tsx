import { UserT } from "lib/types";
import React, { FC } from "react";
import { UserItem } from "./UserItem";

interface UsersListT {
  items: UserT[];
}

export const UsersList: FC<UsersListT> = ({ items }) => {
  return items.length > 0 ? (
    <ul>
      {items.map((item, idx) => (
        <UserItem key={idx} {...item} />
      ))}
    </ul>
  ) : (
    <div className="center">
      <h2>No users found.</h2>
    </div>
  );
};
