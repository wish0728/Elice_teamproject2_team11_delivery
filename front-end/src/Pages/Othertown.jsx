import React from "react";
import styled from "styled-components";
import { Container } from "../Components/common";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";

const OthertownContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.titleColor};
`;

const OthertownBody = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 5;
  display: flex;
  flex-direction: row;
`;

const OthertownMenu = styled(Menu)`
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
`;

const MainContents = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 4;
  border-left: 1px solid;
`;

const Othertown = () => {
  return (
    <OthertownContainer>
      <MenuHeader />
      <OthertownBody>
        <OthertownMenu />
        <MainContents />
      </OthertownBody>
    </OthertownContainer>
  );
};

export default Othertown;
