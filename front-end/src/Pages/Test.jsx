import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import deliveryApi from "../apis/delivery";
import { Container } from "../Components/common";
import Loading from "../Components/Loading";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import MyResponsiveBar from "../Components/MyResponsiveBar";
import { AREAS, DETAIL_AREAS } from "../constants/delivery_data";
import { loadingState, menuState } from "../state";
import { CONTENTS_ARTICLE, CONTENTS_BUTTON } from "../constants/Mytown_data";
import Map from "../Components/Map/Map";

const MytownContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.titleColor};
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
`;

const MapContentsArea = styled.div`
  display: inline-flex;
  width: 500px;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

//셀렉트를 위한
const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
  margin-right: 8px;
  width: 130px;
`;

const Option = styled.option`
  border-radius: 5px;
`;

const SelectMessage = styled.div`
  font-size: 22px;
`;

const SubmitBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-top: 20px;
`;
const SubmitButton = styled.button`
  border-radius: 3px;
  height: 28px;
`;

const Mytown = () => {
  const firstLocation = useRecoilValue(menuState)[0]; //메뉴 버튼들 중 첫번째 메뉴를 의미
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [area, setArea] = useState(""); //첫번째 Select 도/시 선택시 값이 담길 변수
  const [detailArea, setDetailArea] = useState([]); //area가 결정되면 두번째 Select에 값 담기 위한 변수
  const [dAreaValue, setDAreaValue] = useState(""); //두번째 Select의 값
  const [apiRes, setApiRes] = useState([]); //api 통신 값을 담을 변수
  const [standardBy, setStandardBy] = useState("by_time"); //데이터 받아오는 기준 (default : 시간)

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
      console.log(area);
      //지도 클릭시 dAreaValue 값 전체로 설정
      setDAreaValue("전체");
    }
  }, [area]);

  //바로 실행되지 않는 문제 해결
  useEffect(() => {
    if (dAreaValue === "전체") {
      apiExecute();
    }
  }, [area, dAreaValue]);

  //확인하러 가기 버튼에 연결
  const searchArea = () => {
    //첫번째 셀렉트가 입력이 안된경우
    if (area === "") {
      alert("도/시를 선택해주세요!");
      return;
    }
    if (dAreaValue === "") {
      alert("군/구를 선택해주세요!");
      return;
    }
    apiExecute();
  };

  //api 받아오는 메소드
  const apiExecute = async () => {
    try {
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 ) 굳이 필요는 없음
      setIsLoading(true);
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Time_Average(area, dAreaValue)
            .then((response) => {
              setApiRes(response.data);
              console.log(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        case "by_day":
          console.log("요일에 따라");
          await deliveryApi
            .get_Day_Average(area, dAreaValue)
            .then((response) => {
              setApiRes(response.data);
              console.log(response.data);
              response.data.map((i, idx) =>
                console.log(i["day"], i["freqavg"])
              );
            });
          break;
      }
      // await deliveryApi.get_Time_Average(area, dAreaValue).then((response) => {
      //   setApiRes(response.data);
      //   response.data.map((i, idx) => console.log(i["time"], i["freqavg"]));
      // });
    } catch (e) {
      console.log(e);
    }
    //로딩 완료
    setIsLoading(false);
  };

  //첫번째 셀렉트 변화 감지
  const changeFirstSelect = (e) => {
    setArea(e.target.value);
  };

  //두번째 셀렉트 변화 감지
  const changeSecondSelect = (e) => {
    setDAreaValue(e.target.value);
  };

  const changeStandardBySelect = (e) => {
    setStandardBy(e.target.value);
    console.log("동작한다!");
  };

  return (
    <MytownContainer>
      <MenuHeader />
      <MytownBody>
        <MytownMenu />
        <MainContents>
          <SelectContainer>
            <Select name="areaData" onChange={changeFirstSelect} value={area}>
              <Option value="">도/시 선택</Option>
              {AREAS.map((item) => {
                return (
                  <Option key={`key_${item}`} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
            <Select onChange={changeSecondSelect} value={dAreaValue}>
              <Option value="">군/구 선택</Option>
              {detailArea.length !== 0 &&
                detailArea.map((item) => {
                  return (
                    <Option key={`key_${item}`} value={item}>
                      {item}
                    </Option>
                  );
                })}
            </Select>
            <SelectMessage>지역의 배달 주문량</SelectMessage>
          </SelectContainer>
          <SubmitBtnContainer>
            <Select onChange={changeStandardBySelect} value={standardBy}>
              <Option value="by_time">시간에 따라</Option>
              <Option value="by_day">요일에 따라</Option>
              <Option value="by_day">공휴일에 따라</Option>
            </Select>
            <SubmitButton onClick={searchArea}>{CONTENTS_BUTTON}</SubmitButton>
          </SubmitBtnContainer>
          <ContentsArea>
            <MapContentsArea>
              <Map area={area} setArea={setArea} />
            </MapContentsArea>
            {!isLoading && apiRes.length !== 0 && (
              <MyResponsiveBar data={apiRes} standardBy={standardBy} />
            )}
            {isLoading && <Loading />}
          </ContentsArea>
        </MainContents>
      </MytownBody>
    </MytownContainer>
  );
};

export default Mytown;
