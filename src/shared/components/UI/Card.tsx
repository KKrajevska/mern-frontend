import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";

interface CardT {
  children: ReactNode;
  padding?: string;
}

export const Card: FC<CardT> = ({ children, padding }) => {
  return <Wrapper padding={padding}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ padding?: string }>`
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  overflow: hidden;
  background: white;
`;
