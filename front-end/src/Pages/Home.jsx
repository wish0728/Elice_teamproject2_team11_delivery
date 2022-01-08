import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { Container, StyledLink } from "../Components/common";
import HomeHeader from "../Components/HomeHeader";
import LoginModal from "../Components/LoginModal";
import Logo from "../Components/Logo";
import { MENU_BTN_1, MENU_BTN_2, MENU_BTN_3 } from "../constants/standard";
import { loginState, menuState, modalState, themeState } from "../state";
import IMG_1 from "../img/IMG_2347.jpg";
import IMG_2 from "../img/IMG_2348.jpg";
import IMG_3 from "../img/IMG_2349.jpg";
import IMG_4 from "../img/city_img.jpeg";
import MAIN_LOAD from "../img/main_load.gif";
import Fade from "react-reveal/Fade";

const fadeIn = keyframes`
  from{
    opacity: 0
  }
  to{
    opacity: 1
  }
`;

const HomeWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 10px;
`;

const HomeContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
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
  &:hover {
    background-color: rgba(165, 56, 255, 0.5);
  }
`;

//꾸미기용 태그들

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  height: ${(props) => props.height};
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const ImgContainer = styled.img`
  width: 100vw;
  height: 100vh;
`;

const LoadImgContainer = styled.img`
  width: 500px;
  height: auto;
`;

const TitleBig = styled.div`
  font-size: 60px;
  font-weight: 700;
  color: ${(props) => props.theme.titleColor};
`;

const TitleMid = styled.div`
  font-size: 30px;
  font-weight: 400;
  color: ${(props) => props.theme.titleColor};
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
      <HeaderContainer>
        <HomeHeader />
      </HeaderContainer>
      <Fade bottom>
        <IntroContainer>
          <TitleBig>배달의 만족</TitleBig>
          <ImgContainer src={IMG_1} />
        </IntroContainer>
      </Fade>
      <Fade bottom>
        <IntroContainer height="400px">
          <TitleMid>코로나로 인해 뗄래야 뗄 수 없는 존재가 된 배달</TitleMid>
        </IntroContainer>
      </Fade>
      <Fade bottom>
        <IntroContainer height="300px">
          <TitleMid>.</TitleMid>
          <TitleMid>.</TitleMid>
          <TitleMid>.</TitleMid>
        </IntroContainer>
      </Fade>
      <Fade bottom>
        <IntroContainer height="500px">
          <TitleMid>코로나 이전의 배달은 지금과 얼마나 차이가 날까?</TitleMid>
        </IntroContainer>
      </Fade>
      <Fade bottom>
        <IntroContainer height="300px">
          <TitleMid>.</TitleMid>
          <TitleMid>.</TitleMid>
          <TitleMid>.</TitleMid>
        </IntroContainer>
      </Fade>
      <Fade bottom>
        <IntroContainer height="500px">
          <TitleMid>우리 지역은 배달을 얼마나 할까?</TitleMid>
          <TitleMid>.</TitleMid>
          <TitleMid>.</TitleMid>
          <TitleMid>이런 생각 한적 있나요 ?</TitleMid>
        </IntroContainer>
      </Fade>
      <Fade bottom>
        <IntroContainer>
          <LoadImgContainer src={MAIN_LOAD} />
          <TitleMid>
            <strong>배달의 만족</strong>은 이런 분들을 위해 만들었습니다!
          </TitleMid>
        </IntroContainer>
      </Fade>
      <LoginModal />
      <HomeContainer>
        <Logo logoWidth="200px" logoFontSize="80px" />
        <MenuContainer>
          <ButtonContainer>
            <StyledLink to="/mytown">
              <Button>{MENU_BTN_1}</Button>
            </StyledLink>
            <StyledLink to="/othertown">
              <Button>{MENU_BTN_2}</Button>
            </StyledLink>
            <StyledLink to="/statistics">
              <Button>{MENU_BTN_3}</Button>
            </StyledLink>
          </ButtonContainer>
        </MenuContainer>
      </HomeContainer>
    </HomeWrap>
  );
};

export default Home;
