import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { EmptyDiv, StyledLink } from "./common";
import ToggleSwitch from "./ToggleSwitch";
import { loginState, modalState, themeState } from "../state";
import { Dark, Light } from "../Themes/theme";

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

const HeaderBtn = styled.button`
  width: 130px;
  height: 40px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.hBtnColor};
`;

const HomeHeader = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState); //모달 여닫기

  const { isLoggedIn: isLoggedInValue } = useRecoilValue(loginState); //로그인 상태 감지
  const { name: userName } = useRecoilValue(loginState); //로그인한 유저 이름

  const [theme, setTheme] = useRecoilState(themeState);

  //새로 랜더링 될때마다 라이트모드로 돌아감 => 홈으로 갈때마다 라이트 모드로 돌아감
  const { name: themeName } = useRecoilValue(themeState);
  //삼항 연산자를 사용하여 홈으로 돌아갈때마다 false로 초기화 되지 않도록 바꿈
  const [isDarkMode, setIsDarkMode] = useState(false); //체크 감지

  //토글 변경될때마다 isDarkMode 값 변경
  const onChangeToggle = () => {
    setIsDarkMode((current) => !current);
  };

  useEffect(() => {
    if (isDarkMode) {
      //다크모드
      setTheme(Dark);
      return;
    }
    //그 외의 경우에는 라이트모드
    setTheme(Light);
  }, [isDarkMode]);

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
        <HeaderBtn onClick={onChangeToggle}>
          {isDarkMode ? "라이트 모드로 보기" : "다크 모드로 보기"}
        </HeaderBtn>
      </DarkModeContainer>
      <LoginContainer>
        {!isLoggedInValue && (
          <HeaderBtn onClick={onClickModal}>LOGIN</HeaderBtn>
        )}
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
