import styled from "@emotion/styled/macro";
import { UserT } from "lib/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "shared/components/UI/Avatar";
import { Card } from "shared/components/UI/Card";

export const UserItem: FC<UserT> = ({ id, image, name, places }) => {
  return (
    <LI>
      <Card padding="0">
        <LINK to={`/${id}/places`}>
          <Image>
            <Avatar image={image} alt={name} />
          </Image>
          <HWrapper>
            <H2>{name}</H2>
            <H3>
              {places} {places === 1 ? "Place" : "Places"}
            </H3>
          </HWrapper>
        </LINK>
      </Card>
    </LI>
  );
};

const LI = styled.li`
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;
`;

const Image = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  color: #ffd900;
  margin: 0 0 0.5rem 0;
`;

const H3 = styled.h3`
  margin: 0;
`;

const LINK = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 1rem;
  color: white;
  background: #292929;
  :hover {
    background: #ffd900;
  }
  :active {
    background: #ffd900;
  }
`;

const HWrapper = styled.div`
  :hover ${H2} {
    color: #292929;
  }
  :hover ${H3} {
    color: #292929;
  }
  :active ${H2} {
    color: #292929;
  }
  :active ${H3} {
    color: #292929;
  }
`;
