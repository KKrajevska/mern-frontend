import styled from "@emotion/styled";
import { PlaceT } from "lib/types";
import React, { FC } from "react";
import { Card } from "shared/components/UI/Card";
import { PlaceItem } from "./PlaceItem";

interface PlaceListT {
  items: PlaceT[];
}

export const PlaceList: FC<PlaceListT> = ({ items }) => {
  return items.length > 0 ? (
    <UL>
      {items.map((place, idx) => (
        <PlaceItem place={place} key={idx} />
      ))}
    </UL>
  ) : (
    <Wrapper>
      <Card>
        <h2>No places found. Maybe create one?</h2>
        <button>Share Place</button>
      </Card>
    </Wrapper>
  );
};

const UL = styled.ul`
  list-style: none;
  margin: 1rem auto;
  padding: 0;
  width: 90%;
  max-width: 40rem;
`;
const Wrapper = styled.div`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
