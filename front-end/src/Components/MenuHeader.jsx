import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import LogoSrc from "../img/chef.png";
import { useRecoilValue } from "recoil";
import { loginState } from "../state";

const MytownHeader = styled.div`
  width: 100%;
  height: 150px;
  flex-grow: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 20px 30px;
  box-sizing: border-box;
`;

const HedaerLogo = styled(Logo)`
  flex-grow: 1;
`;

const EmptyDiv = styled.div`
  flex-grow: 30;
`;

const LogoImg = styled.img`
  width: 130px;
  height: 100%;
  margin-right: 20px;
`;

const Username = styled.div``;

const MenuHeader = () => {
  const { isLoggedIn: isLoggedInValue } = useRecoilValue(loginState); //로그인 상태 감지
  const { name: userName } = useRecoilValue(loginState); //로그인한 유저 이름

  return (
    <MytownHeader>
      <HedaerLogo logoWidth="50px" logoHeight="50px" logoFontSize="43px" />
      <EmptyDiv />
      {isLoggedInValue && <Username>{userName}님</Username>}
      <LogoImg src={LogoSrc} alt="메뉴이미지" />
    </MytownHeader>
  );
};

export default MenuHeader;
