import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import deliveryApi from "../apis/delivery";
import { Container } from "../Components/common";
import Loading from "../Components/Loading";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import MyResponsiveBar from "../Components/MyResponsiveBar";
import Map from "../Components/Map/Map";

import { AREAS, DETAIL_AREAS } from "../constants/delivery_data";
import { firstLocationState, loadingState, menuState } from "../state";

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

const ContentsArea = styled.div`
  width: 1200px;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
`;

//===============테스트용==================
const TestContentsArea = styled.div`
  display: inline-flex;
  width: 50%;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
`;

const MapContentsArea = styled.div`
  display: inline-flex;
  width: 50%;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
`;
//===============테스트용==================

const Select = styled.select``;

const Option = styled.option``;

//===============삭제 예정==================
const TestBtn = styled.button``;

//===============삭제 예정==================

const Mytown = () => {
  const firstLocation = useRecoilValue(menuState)[0]; //메뉴 버튼들 중 첫번째 메뉴를 의미
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [area, setArea] = useState(""); //첫번째 Select 도/시 선택시 값이 담길 변수
  const [detailArea, setDetailArea] = useState([]); //area가 결정되면 두번째 Select에 값 담기 위한 변수

  const [dAreaValue, setDAreaValue] = useState("");
  const [apiRes, setApiRes] = useState([]); //api 통신 값을 담을 변수

  useEffect(() => {
    //첫번째 Select가 초기화 될경우
    if (area == "") {
      //두번째 Select도 초기화
      setDetailArea([]);
    } else {
      DETAIL_AREAS.find((element) => {
        if (element.id == area) {
          setDetailArea(element.value); //두번째 Select를 위한 값 설정
        }
      });
    }
  }, [area]);

  useEffect(() => {
    console.log(area);
    setDAreaValue("전체");
    apiTest();
  }, [area]);

  useEffect(() => {
    console.log(detailArea);
  }, [detailArea]);

  useEffect(() => {
    console.log(firstLocation);
  }, [firstLocation]);

  useEffect(() => {
    console.log("api state 변경 : ", apiRes);
  }, [apiRes]);

  //시군구 테스트 버튼에 연결
  const searchArea = () => {
    apiTest();
  };

  //api 받아오는 메소드
  const apiTest = async () => {
    try {
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 )
      setIsLoading(true);
      await deliveryApi.get_Time_Average(area, dAreaValue).then((response) => {
        setApiRes(response.data);
        console.log("옵젝:", typeof response.data, response.data);
      });
    } catch (e) {
      console.log(e);
    }
    //로딩 완료
    setIsLoading(false);
  };

  const changeSelectOptionHadler = (e) => {
    setArea(e.target.value);
  };

  const changeSelectOptionHadlerTest = (e) => {
    console.log("작동중");
    setArea(e.target.id);
  };

  const changeTest = (e) => {
    setDAreaValue(e.target.value);
  };

  return (
    <MytownContainer>
      <MenuHeader />
      <MytownBody>
        <MytownMenu />
        <MainContents>
          <Select
            name="areaData"
            onChange={changeSelectOptionHadler}
            value={area}
          >
            <Option value="">도/시 선택</Option>
            {AREAS.map((item) => {
              return (
                <Option key={`key_${item}`} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
          {detailArea.length !== 0 && (
            <Select onChange={changeTest}>
              <Option value="">군/구 선택</Option>
              {detailArea.map((item) => {
                return (
                  <Option key={`key_${item}`} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          )}
          <TestBtn onClick={searchArea}>시군구 테스트</TestBtn>
          <div />
          <TestContentsArea>
            {!isLoading && apiRes.length !== 0 && (
              <MyResponsiveBar data={apiRes} />
            )}
            {isLoading && <Loading />}
          </TestContentsArea>
          <MapContentsArea>
            <Map area={area} setArea={setArea} />
          </MapContentsArea>
        </MainContents>
      </MytownBody>
    </MytownContainer>
  );
};

export default Mytown;
