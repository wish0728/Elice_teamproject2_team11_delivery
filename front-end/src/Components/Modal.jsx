import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContents = styled.div`
  width: 350px;
  height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 14px;
`;

const ModalEmail = styled.input.attrs({
  type: "id",
})`
  width: 200px;
  height: 25px;
  font-size: 18px;
  padding: 5px;
  margin-bottom: 14px;
  border-radius: 8px;
`;

const ModalPwd = styled.input.attrs({
  type: "password",
})`
  width: 200px;
  height: 25px;
  font-size: 18px;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ModalCreate = styled.button`
  width: 200px;
  height: 30px;
  border-radius: 8px;
  color: black;
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Modal = () => {
  //아이디, 비밀번호에 대한 상태관리 작성 필요

  return (
    <ModalContainer>
      <ModalContents>
        <ModalTitle>LOGIN</ModalTitle>
        <ModalEmail placeholder="email" />
        <ModalPwd placeholder="password" />
        <ModalCreate>create account</ModalCreate>
        <StyledLink to="/usersetting">forgot?</StyledLink>
      </ModalContents>
    </ModalContainer>
  );
};

export default Modal;
