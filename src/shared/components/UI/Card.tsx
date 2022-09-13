import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";

interface CardT {
  children: ReactNode;
  cardStyles?: SerializedStyles;
}

export const Card: FC<CardT> = ({ children, cardStyles }) => {
  return <Wrapper cardStyles={cardStyles}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ cardStyles?: SerializedStyles }>`
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
  ${(props) => props.cardStyles}
`;
