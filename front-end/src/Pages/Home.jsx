import React from "react";
import styled from "styled-components";
import { Container, StyledLink } from "../Components/common";

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

const BannerContainer = styled.div`
  flex-grow: 1.5;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const Logo = styled.span`
  font-size: 80px;
  font-weight: 600;
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
  return (
    <HomeContainer>
      <BannerContainer>
        <LogoContainer>
          <Logo>배달의</Logo>
        </LogoContainer>
        <LogoContainer>
          <Logo>만족</Logo>
        </LogoContainer>
      </BannerContainer>
      <MenuContainer>
        <ButtonContainer>
          <StyledLink to="/mytown">
            <Button>우리 동네 배달건수 알아보기</Button>
          </StyledLink>
          <StyledLink to="othertown">
            <Button>이웃 동네 배달건수 구경하기</Button>
          </StyledLink>
          <Button>숫자로 보는 배달</Button>
        </ButtonContainer>
      </MenuContainer>
    </HomeContainer>
  );
};

export default Home;
