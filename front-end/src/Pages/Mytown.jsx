import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Container } from "../Components/common";
import Menu from "../Components/Menu";
import { firstLocationState } from "../state";

const MytownContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const MytownHeader = styled.div`
  width: 100%;
  height: 70px;
  flex-grow: 2;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid;
`;

const MytownBody = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 5;
  display: flex;
  flex-direction: row;
`;

const MytownMenu = styled(Menu)`
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

const Mytown = () => {
  const firstLocation = useRecoilValue(firstLocationState);

  useEffect(() => {
    console.log(firstLocation);
  }, [firstLocation]);
  return (
    <MytownContainer>
      <MytownHeader>
        <div>1</div>
      </MytownHeader>
      <MytownBody>
        <MytownMenu />
        <MainContents />
      </MytownBody>
    </MytownContainer>
  );
};

export default Mytown;
