import styled from "@emotion/styled";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "shared/context/authContext";

export const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <UL>
      <LI>
        <NAVLINK to="/">ALL USERS</NAVLINK>
      </LI>
      {auth.isLoggedIn && (
        <LI>
          <NAVLINK to={`/${auth.userId}/places`}>MY PLACES</NAVLINK>
        </LI>
      )}
      {auth.isLoggedIn && (
        <LI>
          <NAVLINK to="/places/new">ADD PLACE</NAVLINK>
        </LI>
      )}
      {!auth.isLoggedIn && (
        <LI>
          <NAVLINK to="/auth">AUTHENTICATE</NAVLINK>
        </LI>
      )}
      {auth.isLoggedIn && (
        <LI>
          <Button onClick={auth.logout}>LOGOUT</Button>
        </LI>
      )}
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

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #292929;
  color: #292929;
  background: transparent;
  padding: 0.5rem;
  font: inherit;
`;
