import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BannerContainer = styled.div`
  flex-grow: 1.5;
  width: ${(props) => props.logoWidth || "100px"};
  height: ${(props) => props.logoHeight || "50px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const LogoText = styled.span`
  font-size: ${(props) => props.fontsize || "18px"};
  font-weight: 600;
  color: ${(props) => props.theme.titleColor};
`;

const Logo = ({ logoWidth, logoHeight, logoFontSize }) => {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return (
    <BannerContainer
      onClick={returnHome}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
    >
      <LogoContainer>
        <LogoText fontsize={logoFontSize}>배달의</LogoText>
      </LogoContainer>
      <LogoContainer width={logoWidth}>
        <LogoText fontsize={logoFontSize}>만족</LogoText>
      </LogoContainer>
    </BannerContainer>
  );
};

export default Logo;
