import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface SideDrawerT {
  children: ReactNode;
}

export const SideDrawer: FC<SideDrawerT> = ({ children }) => {
  const content = <Aside>{children}</Aside>;
  const portalDiv = document.getElementById("drawer-hook")!;
  return ReactDOM.createPortal(content, portalDiv);
};

const Aside = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;
