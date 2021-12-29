import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Container, StyledLink } from "../Components/common";
import Logo from "../Components/Logo";
import { MENU_BTN_1, MENU_BTN_2, MENU_BTN_3 } from "../constants/standard";
import {
  firstLocationState,
  secondLocationState,
  thridLocationState,
} from "../state";

const HomeContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: white;
  box-sizing: border-box;
`;

const MenuContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 20px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  width: 100%;
  border: 30px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 250px;
  height: 40px;
  margin: 5px 40px 40px 5px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 5px;
  color: #a538ff;
`;

const Home = () => {
  const isFirst = useRecoilValue(firstLocationState);
  const isSecond = useRecoilValue(secondLocationState);
  const isThrid = useRecoilValue(thridLocationState);
  const resetFirst = useResetRecoilState(firstLocationState);
  const resetSecond = useResetRecoilState(secondLocationState);

  const homeLocation = useLocation().pathname;

  useEffect(() => {
    if (homeLocation === "/") {
      console.log("homelocation", homeLocation);
      resetFirst();
      resetSecond();
    }
    console.log(isFirst, isSecond, isThrid, homeLocation);
  }, [isFirst, isSecond, isThrid]);
  return (
    <HomeContainer>
      <Logo logoWidth="200px" logoFontSize="80px" />
      <MenuContainer>
        <ButtonContainer>
          <StyledLink to="/mytown">
            <Button>{MENU_BTN_1}</Button>
          </StyledLink>
          <StyledLink to="othertown">
            <Button>{MENU_BTN_2}</Button>
          </StyledLink>
          <Button>{MENU_BTN_3}</Button>
        </ButtonContainer>
      </MenuContainer>
    </HomeContainer>
  );
};

export default Home;
