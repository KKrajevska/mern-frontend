import styled from "@emotion/styled";
import React from "react";
import { NavLink } from "react-router-dom";

export const NavLinks = () => {
  return (
    <UL>
      <LI>
        <NAVLINK to="/">ALL USERS</NAVLINK>
      </LI>
      <LI>
        <NAVLINK to="/u1/places">MY PLACES</NAVLINK>
      </LI>
      <LI>
        <NAVLINK to="/places/new">ADD PLACE</NAVLINK>
      </LI>
      <LI>
        <NAVLINK to="/auth">AUTHENTICATE</NAVLINK>
      </LI>
    </UL>
  );
};

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LI = styled.li`
  margin: 1rem;
  @media (min-width: 768px) {
    margin: 0 0.5rem;
  }
`;

const NAVLINK = styled(NavLink)`
  border: 1px solid transparent;
  color: #292929;
  text-decoration: none;
  padding: 0.5rem;
  :active {
    background: #f8df00;
    border-color: #292929;
    color: #292929;
  }
  :hover {
    background: #f8df00;
    border-color: #292929;
    color: #292929;
  }
  &.active {
    background: #f8df00;
    border-color: #292929;
    color: #292929;
  }
  @media (min-width: 768px) {
    color: white;
    text-decoration: none;
  }
`;
