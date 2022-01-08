import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { MENU_BTN_1, MENU_BTN_2, MENU_BTN_3 } from "../constants/standard";
import { menuState } from "../state";
import { StyledLink } from "./common";
import ToggleSwitch from "./ToggleSwitch";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 20px 30px;
  box-sizing: border-box;
  align-items: center;
`;

const Wrap = styled.div`
  border-radius: 5px;
  margin-bottom: 20px;
`;

const MenuBtn = styled.div`
  color: ${(props) => (props.checked ? props.theme.titleColor : "#a538ff")};
  display: flex;
  flex-direction: row;
  width: 220px;
  height: 30px;
  padding: 25px;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.checked ? "#a538ff" : props.theme.menuColor};
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
    if (location.includes("statistics")) {
      console.log("세번째 메뉴");
      setMenuLocation([false, false, true]);
      return;
    }
    console.log("menu Location:", location, menuLocation);
    setMenuLocation([false, false, false]);
  }, [location]);

  return (
    <MenuContainer>
      <Wrap>
        <StyledLink to="/mytown">
          <MenuBtn checked={menuLocation[0]}>
            <span>{MENU_BTN_1}</span>
          </MenuBtn>
        </StyledLink>

        <StyledLink to="/othertown">
          <MenuBtn checked={menuLocation[1]}>{MENU_BTN_2}</MenuBtn>
        </StyledLink>

        <StyledLink to="/statistics">
          <MenuBtn checked={menuLocation[2]}>{MENU_BTN_3}</MenuBtn>
        </StyledLink>
      </Wrap>

      <Wrap>
        <MenuBtn>
          <span>🌙 다크모드</span>
          <ToggleSwitch />
        </MenuBtn>
        <MenuBtn>유저 정보</MenuBtn>
      </Wrap>
    </MenuContainer>
  );
};

export default Menu;
