import React, { FC } from "react";
import { Button } from "../FormElements/Button";
import { Modal } from "./Modal";

interface ErrorModalT {
  onClear: () => void;
  error: string | null;
}

export const ErrorModal: FC<ErrorModalT> = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      show={!!error}
      modalOverlay={{
        footer: <Button onClick={onClear}>Okay</Button>,
        children: <p>{error}</p>,
        header: "An Error Occurred!",
      }}
    />
  );
};
