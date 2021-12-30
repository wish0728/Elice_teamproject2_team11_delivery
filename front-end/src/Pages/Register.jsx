import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../Components/common";

const RegisterContainer = styled(Container)``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const Label = styled.label``;

const Input = styled.input``;

const SubmitBtn = styled.button``;

const Register = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onIdChange = (e) => {
    setId(e.target.value);
  };

  const onPasswdChange = (e) => {
    setPasswd(e.target.value);
  };

  const onPwCheckChange = (e) => {
    setPwCheck(e.target.value);
  };

  const submitRegist = () => {
    console.log(id, name, passwd, pwCheck);
  };

  //api 실행 메소드
  //   const api_regist = async() =>{
  //     const result = await
  //   }

  return (
    <RegisterContainer>
      <div>회원가입</div>
      <InputContainer>
        <Label>이름</Label>
        <Input onChange={onNameChange} value={name} />
        <Label>아이디</Label>
        <Input onChange={onIdChange} value={id} />
        <Label>비밀번호</Label>
        <Input onChange={onPasswdChange} value={passwd} type={"password"} />
        <Label>비밀번호 확인</Label>
        <Input onChange={onPwCheckChange} value={pwCheck} type={"password"} />
        <SubmitBtn onClick={submitRegist}>확인</SubmitBtn>
      </InputContainer>
    </RegisterContainer>
  );
};

export default Register;
