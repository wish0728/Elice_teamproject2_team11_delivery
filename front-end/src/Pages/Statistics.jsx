import React, { useEffect, useState } from "react";
import styled from "styled-components";
import deliveryApi from "../apis/delivery";
import { Container, MenuWrapper, Option, Select } from "../Components/common";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import MyResponsiveBar from "../Components/MyResponsiveBar";
import { AREAS, DETAIL_AREAS } from "../constants/delivery_data";
import { CONTENTS_BUTTON } from "../constants/Mytown_data";

const OthertownContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.titleColor};
  overflow: scroll;
`;

const OthertownBody = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 5;
  display: flex;
  flex-direction: row;
  padding: 20px;
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
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 300px;
  overflow: scroll;
  z-index: 99;
  box-sizing: border-box;
`;

const SelectMessage = styled.div`
  margin-left: 20px;
  width: 100px;
`;

const SelectWrap = styled(MenuWrapper)`
  width: 100%;
  margin-bottom: 20px;
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 500px;
`;

const GrapArea = styled.div`
  flex-grow: 1;
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

const Statistics = () => {
  const [area, setArea] = useState(""); //첫번째 Select 도/시 선택시 값이 담길 변수
  const [detailArea, setDetailArea] = useState([]); //area가 결정되면 두번째 Select에 값 담기 위한 변수
  const [dAreaValue, setDAreaValue] = useState(""); //두번째 Select의 값
  const [apiRes, setApiRes] = useState([]); //api 통신 값을 담을 변수
  const standardBy = "by_time";

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

  useEffect(() => {
    console.log(apiRes);
  }, [apiRes]);

  //첫번째 셀렉트 변화 감지
  const changeFirstSelect = (e) => {
    setArea(e.target.value);
  };

  //두번째 셀렉트 변화 감지
  const changeSecondSelect = (e) => {
    setDAreaValue(e.target.value);
  };

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
      const tmpObj = {};
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 ) 굳이 필요는 없음
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Holiday_Average(area, dAreaValue)
            .then((response) => {
              setApiRes(response.data);
              response.data.map((i, idx) => (tmpObj[i.year] = { ...i }));
            })
            .then((tmpObj) => console.log(tmpObj));
          break;
        case "by_day":
          console.log("요일에 따라");
          if (area !== "세종특별자치시" && dAreaValue === "전체") {
            alert("세부지역을 다시 설정해주세요.");
            break;
          }
          await deliveryApi
            .get_Day_Average(area, dAreaValue)
            .then((response) => {
              setApiRes(response.data);
              console.log(response.data);
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
  };

  return (
    <OthertownContainer>
      <MenuHeader />
      <OthertownBody>
        <OthertownMenu />
        <MainContents>
          <SelectWrap>
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
              <SubmitButton onClick={searchArea}>
                {CONTENTS_BUTTON}
              </SubmitButton>
            </SubmitBtnContainer>
          </SelectWrap>
        </MainContents>
      </OthertownBody>
    </OthertownContainer>
  );
};

export default Statistics;
