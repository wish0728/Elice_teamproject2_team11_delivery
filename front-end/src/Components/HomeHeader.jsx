import React, { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { EmptyDiv, StyledLink } from "./common";
import ToggleSwitch from "./ToggleSwitch";
import { loginState } from "../state";

const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
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

const HomeHeader = () => {
  const [modalOpen, setModalOpen] = useRecoilState(loginState);

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
        <LoginBtn onClick={onClickModal}>LOGIN</LoginBtn>
      </LoginContainer>
    </HeaderContainer>
  );
};

export default HomeHeader;
