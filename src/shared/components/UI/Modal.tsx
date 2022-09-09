import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Backdrop } from "./Backdrop";

interface ModalOverlayT {
  header: string;
  onSubmit?: () => void;
  children: ReactNode;
  footer?: any;
  padding?: string;
  textAlign?: string;
}

const ModalOverlay: FC<ModalOverlayT> = ({
  header,
  onSubmit,
  children,
  footer,
  padding,
}) => {
  const content = (
    <ModalWrapper padding={padding}>
      <ModalHeader>
        <H2>{header}</H2>
      </ModalHeader>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <ModalContent>{children}</ModalContent>
        <Footer>{footer}</Footer>
      </form>
    </ModalWrapper>
  );

  const portalDiv = document.getElementById("modal-hook")!;
  return ReactDOM.createPortal(content, portalDiv);
};

const ModalWrapper = styled.div<{ padding?: string }>`
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
  padding: ${(props) => props.padding};
`;

const ModalHeader = styled.header`
  width: 100%;
  padding: 1rem 0.5rem;
  background: #2a006e;
  color: white;
`;

const H2 = styled.h2`
  margin: 0.5rem;
`;
const ModalContent = styled.div`
  padding: 1rem 0.5rem;
`;

const Footer = styled.footer`
  padding: 1rem 0.5rem;
`;

interface ModalT {
  show: boolean;
  onCancel: () => void;
  modalOverlay: ModalOverlayT;
}

export const Modal: FC<ModalT> = ({ show, onCancel, modalOverlay }) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...modalOverlay} />
      </CSSTransition>
    </>
  );
};
