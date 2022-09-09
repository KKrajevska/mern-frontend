import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonT {
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  to?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
export const Button: FC<ButtonT> = ({
  href,
  size,
  inverse,
  danger,
  to,
  children,
  onClick,
  disabled,
  type,
}) => {
  if (href) {
    return (
      <StyledButton
        size={size}
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        href={href}
        inverse={inverse}
        danger={danger}
      >
        {children}
      </StyledButton>
    );
  }
  if (to) {
    return (
      <LINK to={to} size={size} danger={danger} inverse={inverse}>
        {children}
      </LINK>
    );
  }
  return (
    <StyledButton
      size={size}
      inverse={inverse}
      danger={danger}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const getSharedStyling = ({
  size,
  href,
  inverse,
  danger,
}: {
  size?: string;
  href?: string;
  inverse?: boolean;
  danger?: boolean;
}) => css`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${(danger && "#830000") || "#ff0055"};
  border-radius: 4px;
  background: ${(inverse && "transparent") ||
  (danger && "#830000") ||
  "#ff0055"};
  color: ${(inverse && "#ff0055") || "white"};
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
  font-size: ${size === "small" ? "0.8rem" : "1.5rem"};
  :hover {
    background: ${(inverse && "#ff0055") || (danger && "#f34343") || "#ff4382"};
    border-color: ${(danger && "#f34343") || "#ff4382"};
    color: ${inverse && "white"};
    :disabled {
      background: #ccc;
      color: #979797;
      border-color: #ccc;
      cursor: not-allowed;
    }
  }
  :active {
    background: ${(inverse && "#ff0055") || (danger && "#f34343") || "#ff4382"};
    border-color: ${(danger && "#f34343") || "#ff4382"};
    color: ${inverse && "white"};
  }
  :focus {
    outline: none;
  }
  :disabled {
    background: #ccc;
    color: #979797;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

export const StyledButton = styled.button<{
  size?: string;
  href?: string;
  inverse?: boolean;
  danger?: boolean;
}>`
  ${({ size, href, inverse, danger }) =>
    getSharedStyling({ size, href, inverse, danger })}
`;

const LINK = styled(Link)<{
  size?: string;
  href?: string;
  inverse?: boolean;
  danger?: boolean;
}>`
  ${({ size, href, inverse, danger }) =>
    getSharedStyling({ size, href, inverse, danger })}
`;
