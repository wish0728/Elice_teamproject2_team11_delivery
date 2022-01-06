import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { EmptyDiv, StyledLink } from "./common";
import ToggleSwitch from "./ToggleSwitch";
import { loginState, modalState } from "../state";

const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: flex-end;
`;

const HeaderEmptyDiv = styled(EmptyDiv)`
  flex-grow: 10;
`;

const DarkModeContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoginBtn = styled.button``;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserIcon = styled.div`
  background-color: black;
  border-radius: 25px;
  width: 50px;
  height: 50px;
`;

const Username = styled.div``;

const HomeHeader = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState); //모달 여닫기

  const { isLoggedIn: isLoggedInValue } = useRecoilValue(loginState); //로그인 상태 감지
  const { name: userName } = useRecoilValue(loginState); //로그인한 유저 이름

  useEffect(() => {
    console.log("모달 열림. : ", modalOpen);
  }, [modalOpen]);

  const onClickModal = () => {
    setModalOpen((current) => !current);
  };

  return (
    <HeaderContainer>
      <HeaderEmptyDiv />
      <DarkModeContainer>
        <ToggleSwitch />
      </DarkModeContainer>
      <LoginContainer>
        {!isLoggedInValue && <LoginBtn onClick={onClickModal}>LOGIN</LoginBtn>}
        {isLoggedInValue && (
          <UserContainer>
            <UserIcon />
            <Username>{userName}님 반갑습니다</Username>
          </UserContainer>
        )}
      </LoginContainer>
    </HeaderContainer>
  );
};

export default HomeHeader;
