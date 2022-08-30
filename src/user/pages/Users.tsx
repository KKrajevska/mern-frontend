import React from "react";
import { UsersList } from "user/components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 3,
  },
];

export const Users = () => {
  return <UsersList items={USERS} />;
};