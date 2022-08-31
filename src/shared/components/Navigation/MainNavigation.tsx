import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Backdrop } from "../UI/Backdrop";
import { MainHeader } from "./MainHeader";
import { NavLinks } from "./NavLinks";
import { SideDrawer } from "./SideDrawer";

export const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      {drawerIsOpen && (
        <SideDrawer>
          <DrawerNav>
            <NavLinks />
          </DrawerNav>
        </SideDrawer>
      )}

      <MainHeader>
        <Button onClick={openDrawer}>
          <Span />
          <Span />
          <Span />
        </Button>
        <H1>
          <LINK to="/">YourPlaces</LINK>
        </H1>
        <HeaderNav>
          <NavLinks />
        </HeaderNav>
      </MainHeader>
    </>
  );
};

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const H1 = styled.h1`
  color: white;
`;

const LINK = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Span = styled.span`
  display: block;
  width: 3rem;
  height: 2.5px;
  background: white;
`;

const DrawerNav = styled.nav`
  height: 100%;
`;

const HeaderNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;
