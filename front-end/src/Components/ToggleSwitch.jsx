import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { themeState } from "../state";
import { Dark, Light } from "../Themes/theme";

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #171b1c;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #bebebe;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #ffffff;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

//체크박스 옆에 이모지
const ToggleSwitch = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  //새로 랜더링 될때마다 라이트모드로 돌아감 => 홈으로 갈때마다 라이트 모드로 돌아감
  const { name: themeName } = useRecoilValue(themeState);
  //삼항 연산자를 사용하여 홈으로 돌아갈때마다 false로 초기화 되지 않도록 바꿈
  const [isDarkMode, setIsDarkMode] = useState(
    themeName === "light" ? false : true
  ); //체크 감지

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
    console.log(theme);
  }, [theme]);

  return (
    <CheckBoxWrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        checked={isDarkMode}
        onChange={onChangeToggle}
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  );
};

export default ToggleSwitch;
