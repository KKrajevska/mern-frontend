import styled from "@emotion/styled";
import React, { FC } from "react";
import ReactDOM from "react-dom";

interface BackdropT {
  onClick: () => void;
}

export const Backdrop: FC<BackdropT> = ({ onClick }) => {
  const portalDiv = document.getElementById("backdrop-hook")!;
  return ReactDOM.createPortal(
    <BackDrop onClick={onClick}></BackDrop>,
    portalDiv
  );
};

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;
