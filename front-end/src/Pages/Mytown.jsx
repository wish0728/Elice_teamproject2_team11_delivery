import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Container } from "../Components/common";
import Loading from "../Components/Loading";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import { firstLocationState, loadingState } from "../state";

const MytownContainer = styled(Container)`
  display: flex;
  flex-direction: column;
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

const TestBtn = styled.button``;

const Mytown = () => {
  const firstLocation = useRecoilValue(firstLocationState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    console.log(firstLocation);
  }, [firstLocation]);

  useEffect(() => {
    console.log("상태변경", isLoading);
  }, [isLoading]);

  const loadingTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  return (
    <MytownContainer>
      <MenuHeader />
      <MytownBody>
        <MytownMenu />
        <MainContents>
          <TestBtn onClick={loadingTest}>로딩 테스트</TestBtn>
          {isLoading && <Loading />}
        </MainContents>
      </MytownBody>
    </MytownContainer>
  );
};

export default Mytown;
