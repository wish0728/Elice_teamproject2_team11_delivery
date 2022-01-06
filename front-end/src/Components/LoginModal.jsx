import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import authApi from "../apis/auth";
import { ID_MAX_LEN, ID_MIN_LEN, PWD_MIN_LEN } from "../constants/standard";
import { loginState, modalState } from "../state";

const ModalContainer = styled.div`
  display: flex;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
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
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.titleColor};
  box-sizing: border-box;
  z-index: 999;
`;

const ContentsHeader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const CloseBtn = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.titleColor};
  margin-right: 10px;
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
  color: ${(props) => props.theme.titleColor};
  background-color: ${(props) => props.theme.btnColor};
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
  color: ${(props) => props.theme.titleColor};
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const LoginModal = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  //로그인 상태
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const { isLoggedIn: isLoggedInValue } = useRecoilValue(loginState); //로그인 여부
  const { name: userName } = useRecoilValue(loginState); //로그인한 유저 이름

  useEffect(() => {
    console.log(isLoggedInValue, userName);
  }, [modalOpen]);

  useEffect(() => {
    console.log(loginStatus);
  }, [isLoggedInValue, userName]);

  //모달 닫기 버튼
  const closeModal = () => {
    //아이디 비밀번호 입력 칸 비우기
    setId("");
    setPwd("");
    setModalOpen(false);
  };

  const onIdChange = (e) => {
    setId(e.target.value);
    if (e.target.value.length > ID_MAX_LEN) {
      alert("아이디는 20자리를 초과할수 없습니다!");
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
      loginPost();
      console.log(id, pwd);
    }
  };

  //로그인 통신
  const loginPost = async () => {
    try {
      await authApi.send_login({ id: id, password: pwd }).then((response) => {
        if (response.status === 200) {
          //로그인 성공적이면 입력창 초기화
          setId("");
          setPwd("");
          //데이터 넘겨줌
          setLoginStatus({ isLoggedIn: true, name: response.data.name });
          //모달 닫기
          closeModal();
        }
      });
    } catch (e) {
      alert("아이디나 비밀번호를 다시 확인해주세요.");
      console.log(e);
    }
  };

  return (
    <ModalContainer visible={modalOpen}>
      <ModalContents>
        <ContentsHeader>
          <CloseBtn onClick={closeModal}>X</CloseBtn>
        </ContentsHeader>
        <ModalTitle>LOGIN</ModalTitle>
        <ModalEmail placeholder="email" value={id} onChange={onIdChange} />
        <ModalPwd placeholder="password" value={pwd} onChange={onPwdChange} />
        <ModalSubmit onClick={onSubmit}>ok</ModalSubmit>
        <StyledLink to="/register">
          <ModalCreate>create account</ModalCreate>
        </StyledLink>
        <StyledLink to="/usersetting">forgot?</StyledLink>
      </ModalContents>
    </ModalContainer>
  );
};

export default LoginModal;

//추후 바깥 영역 클릭시 모달 닫히도록 구현 예정
//e.target.closet 사용
