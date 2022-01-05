import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Container, StyledLink } from "../Components/common";
import HomeHeader from "../Components/HomeHeader";
import LoginModal from "../Components/LoginModal";
import Logo from "../Components/Logo";
import { MENU_BTN_1, MENU_BTN_2, MENU_BTN_3 } from "../constants/standard";
import { loginState, menuState, modalState, themeState } from "../state";

const HomeWrap = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

const HomeContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
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

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const menuLocation = useRecoilValue(menuState);
  const resetMenuLocation = useResetRecoilState(menuState);

  const homeLocation = useLocation().pathname;

  //랜더링 자체가 안되게하는게 나은지 visible로 처리하는게 나은지
  const isModalOpen = useRecoilValue(modalState);

  useEffect(() => {
    if (homeLocation === "/") {
      console.log("homelocation", homeLocation);
      resetMenuLocation();
    }
    console.log(menuLocation, homeLocation);
  }, [homeLocation]);

  useEffect(() => {
    console.log("메뉴 변화 감지:", menuLocation);
  }, [menuLocation]);

  return (
    <HomeWrap>
      <LoginModal />
      <HomeContainer>
        <HomeHeader />
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
    </HomeWrap>
  );
};

export default Home;
