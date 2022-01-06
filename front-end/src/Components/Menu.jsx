import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { MENU_BTN_1, MENU_BTN_2, MENU_BTN_3 } from "../constants/standard";
import { menuState } from "../state";
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
  const [menuLocation, setMenuLocation] = useRecoilState(menuState);

  //early return 패턴 적용
  useEffect(() => {
    if (location.includes("mytown")) {
      setMenuLocation([true, false, false]);
      return;
    }
    if (location.includes("othertown")) {
      console.log("두번째 메뉴");
      setMenuLocation([false, true, false]);
      return;
    }
    console.log("menu Location:", location, menuLocation);
    setMenuLocation([false, false, false]);
  }, [location]);

  return (
    <MenuContainer>
      <EmptyDiv />
      <Wrap>
        <StyledLink to="/mytown">
          <MenuBtn checked={menuLocation[0]}>{MENU_BTN_1}</MenuBtn>
        </StyledLink>
      </Wrap>
      <Wrap>
        <StyledLink to="/othertown">
          <MenuBtn checked={menuLocation[1]}>{MENU_BTN_2}</MenuBtn>
        </StyledLink>
      </Wrap>
      <Wrap>
        <StyledLink to="/">
          <MenuBtn checked={menuLocation[2]}>{MENU_BTN_3}</MenuBtn>
        </StyledLink>
      </Wrap>
      <EmptyDiv />
    </MenuContainer>
  );
};

export default Menu;
