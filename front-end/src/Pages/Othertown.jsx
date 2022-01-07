import React, { useEffect, useState } from "react";
import styled from "styled-components";
import deliveryApi from "../apis/delivery";
import { Container, Option, Select } from "../Components/common";
import Menu from "../Components/Menu";
import MenuHeader from "../Components/MenuHeader";
import MyResponsiveBar from "../Components/MyResponsiveBar";
import { DETAIL_AREAS } from "../constants/delivery_data";

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

const Input = styled.input`
  width: 150px;
`;

//자동 완성 각각 한개를 담을 div
const SearchDiv = styled.div`
  width: 150px;
  z-index: 100;
  background-color: white;
  &:hover {
    background-color: rgba(188, 188, 188, 0.4);
  }
`;

const SelectMessage = styled.div`
  margin-left: 20px;
  width: 100px;
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const GrapArea = styled.div`
  flex-grow: 1;
`;

const SubmitBtn = styled.button``;

const Othertown = () => {
  const [myTownValue, setMyTownValue] = useState(""); //우리 동네 입력값
  const [otherTownValue, setOtherTownValue] = useState("");

  const [myApiRes, setMyApiRes] = useState([]);
  const [otherApiRes, setOtherApiRes] = useState([]);

  const [standardBy, setStandardBy] = useState("by_time"); //데이터 받아오는 기준 (default : 시간)

  useEffect(() => {
    //todo : 우리 동네와 다른 동네가 서로 안겹치도록 설정

    console.log("todo 확인");
  }, []);

  //우리 동네 값 변화
  const onMyTownChange = (e) => {
    setMyTownValue(e.target.value);
  };

  //다른 동네 값
  const onOtherTownChange = (e) => {
    setOtherTownValue(e.target.value);
  };

  //비교하기 버튼
  const onSubmitClick = () => {
    myApiExecute();
    otherApiExecute();
  };

  //api
  const myApiExecute = async () => {
    try {
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 ) 굳이 필요는 없음
      //setIsLoading(true);
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Time_Average("서울특별시", myTownValue)
            .then((response) => {
              setMyApiRes(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        case "by_day":
          console.log("요일에 따라");
          if (myTownValue === "전체") {
            alert("세부지역을 다시 설정해주세요.");
            break;
          }
          await deliveryApi
            .get_Day_Average("세종특별시", myTownValue)
            .then((response) => {
              setMyApiRes(response.data);
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
    //setIsLoading(false);
  };

  const otherApiExecute = async (area, dAreaValue) => {
    try {
      //로딩 처리 (추후 시간을 재서 일정 시간보다 로딩이 빨리 끝날 경우 default 로딩 시간 지정 ) 굳이 필요는 없음
      //setIsLoading(true);
      switch (standardBy) {
        case "by_time":
          console.log("시간에 따라");
          await deliveryApi
            .get_Time_Average("강원도", otherTownValue)
            .then((response) => {
              setOtherApiRes(response.data);
              response.data.map((i, idx) =>
                console.log(i["time"], i["freqavg"])
              );
            });
          break;
        case "by_day":
          console.log("요일에 따라");
          if (otherTownValue === "전체") {
            alert("세부지역을 다시 설정해주세요.");
            break;
          }
          await deliveryApi
            .get_Day_Average("세종특별시", otherTownValue)
            .then((response) => {
              setOtherApiRes(response.data);
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
    //setIsLoading(false);
  };

  return (
    <OthertownContainer>
      <MenuHeader />
      <OthertownBody>
        <OthertownMenu />
        <MainContents>
          <SelectContainer>
            <input
              type="text"
              name="city"
              list="cityname"
              placeholder="우리 동네"
              value={myTownValue}
              onChange={onMyTownChange}
            />
            <datalist id="cityname">
              {DETAIL_AREAS.map((i) =>
                i.value.map((item) => {
                  if (item !== "전체" && item !== otherTownValue) {
                    return (
                      <Option key={`key_${i.id}_${item}`} value={`${item}`}>
                        {item}
                      </Option>
                    );
                  }
                  return;
                })
              )}
            </datalist>

            <SelectMessage>배달 주문량</SelectMessage>
          </SelectContainer>

          <SelectContainer>
            <input
              type="text"
              name="city"
              list="cityname"
              value={otherTownValue}
              placeholder="다른 동네"
              onChange={onOtherTownChange}
            />
            <datalist id="cityname">
              {DETAIL_AREAS.map((i) =>
                i.value.map((item) => {
                  if (item !== "전체" && item !== myTownValue) {
                    return (
                      <Option key={`key_${i.id}_${item}`} value={`${item}`}>
                        {item}
                      </Option>
                    );
                  }
                  return;
                })
              )}
            </datalist>
            <SelectMessage>배달 주문량</SelectMessage>
          </SelectContainer>
          <SubmitBtn onClick={onSubmitClick}>비교하기</SubmitBtn>
          <ContentsArea>
            <GrapArea>
              {myApiRes.length !== 0 && (
                <MyResponsiveBar data={myApiRes} standardBy={standardBy} />
              )}
            </GrapArea>
            <GrapArea>
              {otherApiRes.length !== 0 && (
                <MyResponsiveBar data={otherApiRes} standardBy={standardBy} />
              )}
            </GrapArea>
          </ContentsArea>
        </MainContents>
      </OthertownBody>
    </OthertownContainer>
  );
};

export default Othertown;
