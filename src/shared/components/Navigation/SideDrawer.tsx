import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
interface SideDrawerT {
  children: ReactNode;
  show: boolean;
  onClick: () => void;
}

export const SideDrawer: FC<SideDrawerT> = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <Aside onClick={onClick}>{children}</Aside>
    </CSSTransition>
  );
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
