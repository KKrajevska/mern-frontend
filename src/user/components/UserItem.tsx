import { UserT } from "lib/types";
import React, { FC } from "react";

export const UserItem: FC<UserT> = ({ id, image, name, places }) => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
          <img src={image} alt={name} />
        </div>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {places} {places === 1 ? "Place" : "Places"}
          </h3>
        </div>
      </div>
    </li>
  );
};
