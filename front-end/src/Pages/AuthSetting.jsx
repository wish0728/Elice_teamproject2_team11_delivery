import React from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../state";

const AuthSetting = () => {
  const { name: userName } = useRecoilValue(loginState);

  const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const UsernameContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100px;
  `;
  return (
    <AuthContainer>
      <div>유저 설정 페이지</div>
      <UsernameContainer>
        <div>로그인 한 유저 이름</div>
        <div>{userName === "" ? "로그인을 해주세요" : userName}</div>
      </UsernameContainer>
    </AuthContainer>
  );
};

export default AuthSetting;
