import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ID_MAX_LEN, ID_MIN_LEN, PWD_MIN_LEN } from "../constants/standard";

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
  border-radius: 8px;
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

const ModalSubmit = styled.button`
  width: 200px;
  height: 30px;
  border-radius: 8px;
  color: black;
  margin-bottom: 15px;
`;

const ModalCreate = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 8px;
  background-color: rgba(100, 180, 243);
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
  //아이디, 비밀번호에 대한 상태관리 작성 필요 (recoil)

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const onIdChange = (e) => {
    setId(e.target.value);
    if (e.target.value.length > ID_MAX_LEN) {
      alert("아이디는 15자리를 초과할수 없습니다!");
      setId(e.target.value.slice(0, ID_MAX_LEN));
    }
  };

  const onPwdChange = (e) => {
    setPwd(e.target.value);
  };

  const onSubmit = () => {
    //id 최소길이 충족 못할시
    if (id.length < ID_MIN_LEN) {
      alert("아이디 길이가 너무 짧습니다. (최소 5자리)");
      //아이디 input 포커스
    } else if (pwd.length < PWD_MIN_LEN) {
      alert("비밀 번호 길이가 너무 짧습니다 (최소 8자리)");
    } else {
      //유저 데이터 넘겨줄 로직 작성 예정
      console.log(id, pwd);
      //넘겨준 뒤 초기화
      setId("");
      setPwd("");
    }
  };
  return (
    <ModalContainer>
      <ModalContents>
        <ModalTitle>LOGIN</ModalTitle>
        <ModalEmail placeholder="email" value={id} onChange={onIdChange} />
        <ModalPwd placeholder="password" value={pwd} onChange={onPwdChange} />
        <ModalSubmit onClick={onSubmit}>ok</ModalSubmit>
        <ModalCreate>create account</ModalCreate>
        <StyledLink to="/usersetting">forgot?</StyledLink>
      </ModalContents>
    </ModalContainer>
  );
};

export default Modal;
