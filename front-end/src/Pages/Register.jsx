import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../Components/common";
import authApi from "../apis/auth";
import {
  REGIST_ID_ERROR,
  REGIST_ID_SUCCESS,
  REGIST_ID_VALID_CHECK,
  REGIST_PWD_EMPTY,
  REGIST_PWD_ERROR,
} from "../constants/standard";

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

const ValidMessage = styled.div`
  color: ${(props) => (props.valid ? "#008D62" : "#BE2E22")};
`;

const Register = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const [idValid, setIdValid] = useState(false); //아이디 유효성 검사
  const [pwdValid, setPwdValid] = useState(false); //비밀번호와 비밀번호 확인이 동일한지 체크

  const [checkIdValid, setCheckIdValid] = useState(false); //ID 중복 검사 버튼을 눌렀을때 안내 메세지 띄우기 위한 state

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

  const checkValidId = () => {
    isExist();
  };

  //id 유효성 검사 메소드
  const isExist = async () => {
    setCheckIdValid(true);
    try {
      await authApi.valid_id(id).then((response) => {
        switch (response.status) {
          case 200:
            setIdValid(true);
            return;
          //해당 부분 오류 있는듯 함. 500번이 돌아오면 바로 catch문으로 들어가는듯
          case 500:
            setIdValid(false);
            return;
          default:
            setIdValid(false);
            return;
        }
      });
    } catch (e) {
      setIdValid(false);
      console.log(e);
    }
  };

  //회원 가입 제출 버튼 클릭시 메소드
  const submitRegist = () => {
    if (!checkIdValid) {
      //아이디 유효성 검사 버튼 클릭 안했을시
      alert(REGIST_ID_VALID_CHECK);
      return setCheckIdValid(false);
    }
    if (!idValid) {
      //아이디 중복 검사에 걸렸을시
      alert(REGIST_ID_ERROR);
      return setIdValid(false);
    } else {
      //그외
      valid_password(); //비밀번호 유효성 검사
      if (pwdValid) {
        //성공적인 경우
        api_regist(); //api 실행 진행
        console.log("id:", id, "name:", name);
        return true;
      } else {
        return false;
      }
    }
  };

  //api 실행 메소드
  const api_regist = async () => {
    try {
      await axios
        .post("http://127.0.0.1:5000/auth/register", {
          id: id,
          password: passwd,
          name: name,
        })
        .then((response) => console.log(response));
    } catch (e) {
      console.log(e);
    }
  };

  //비밀번호 유효성 체크
  const valid_password = () => {
    if (passwd === pwCheck) {
      //동일할 경우 (성공적인 경우)
      setPwdValid(true);
      return;
    } else if (pwCheck === "") {
      //비밀번호 체크란이 비어있을 경우
      alert(REGIST_PWD_EMPTY);
      setPwdValid(false);
      return;
    } else {
      // 비밀번호와 비밀번호 체크가 동일하지 않을 경우
      alert(REGIST_PWD_ERROR);
      setPwdValid(false);
      return;
    }
  };

  return (
    <RegisterContainer>
      <div>회원가입</div>
      <InputContainer>
        <Label>이름</Label>
        <Input onChange={onNameChange} value={name} />
        <Label>아이디</Label>
        <Input onChange={onIdChange} value={id} />
        <button onClick={checkValidId}>아이디 확인</button>
        {checkIdValid && (
          <ValidMessage valid={idValid}>
            {idValid ? REGIST_ID_SUCCESS : REGIST_ID_ERROR}
          </ValidMessage>
        )}
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
