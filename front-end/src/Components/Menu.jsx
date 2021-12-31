import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { MENU_BTN_1, MENU_BTN_2, MENU_BTN_3 } from "../constants/standard";
import {
  firstLocationState,
  secondLocationState,
  thridLocationState,
} from "../state";
import { StyledLink } from "./common";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 20px 30px;
  box-sizing: border-box;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 90px;
`;

const MenuBtn = styled.button`
  color: ${(props) => (props.checked ? "#ffffff" : "#a538ff")};
  width: 200px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) => (props.checked ? "#a538ff" : "#ffffff")};
`;

const EmptyDiv = styled.div`
  flex-grow: 2;
`;

const Menu = () => {
  const location = useLocation().pathname;
  const [isFirst, setIsFirst] = useRecoilState(firstLocationState);
  const [isSecond, setIsSecond] = useRecoilState(secondLocationState);
  const [isThrid, setIsThrid] = useRecoilState(thridLocationState);

  useEffect(() => {
    if (location.includes("mytown")) {
      setIsFirst(true);
      setIsSecond(false);
      setIsThrid(false);
    } else if (location.includes("othertown")) {
      setIsFirst(false);
      setIsSecond(true);
      setIsThrid(false);
      console.log("두번째 메뉴");
    } else {
      setIsFirst(false);
      setIsSecond(false);
      setIsThrid(false);
    }
    console.log("menu Location:", location, isFirst, isSecond, isThrid);
  }, [isFirst, isSecond, isThrid]);
  return (
    <MenuContainer>
      <EmptyDiv />
      <Wrap>
        <StyledLink to="/mytown">
          <MenuBtn checked={isFirst}>{MENU_BTN_1}</MenuBtn>
        </StyledLink>
      </Wrap>
      <Wrap>
        <StyledLink to="/othertown">
          <MenuBtn checked={isSecond}>{MENU_BTN_2}</MenuBtn>
        </StyledLink>
      </Wrap>
      <Wrap>
        <StyledLink to="/">
          <MenuBtn checked={isThrid}>{MENU_BTN_3}</MenuBtn>
        </StyledLink>
      </Wrap>
      <EmptyDiv />
    </MenuContainer>
  );
};

export default Menu;
